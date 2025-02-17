import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Doc, Id } from "../../convex/_generated/dataModel"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { FileTextIcon, GanttChartIcon, ImageIcon, MoreVertical, TrashIcon } from "lucide-react"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/components/ui/alert-dialog"
import { ReactNode, useState } from "react"
import { useMutation, useQuery } from "convex/react"
import { api } from "../../convex/_generated/api"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image";

function FileCardActions({file}: {file: Doc<"files">}){
    const deleteFile = useMutation(api.files.deleteFile);
    const { toast } = useToast();
    
    const [isConfirmOpen, SetIsConfirmOpen] = useState(false);
    return (
        <>
    <AlertDialog open={isConfirmOpen} onOpenChange={SetIsConfirmOpen}>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction 
      onClick={async ()=> {
        await deleteFile({
         fileId: file._id
        });
        toast({
            variant: "default",
            title: "File deleted",
            description: "Your file has been deleted from the system!",
          });
      }}
      >
        Continue
        </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

<DropdownMenu>
  <DropdownMenuTrigger ><MoreVertical /></DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem 
    onClick={()=> SetIsConfirmOpen(true)}
    className="flex gap-1 text-red-600 items-center cursor-pointer">
        <TrashIcon className="w-4 h-4"/>Delete
        </DropdownMenuItem> 
  </DropdownMenuContent>
</DropdownMenu>
</>
    );
}

// function getFileUrl(fileId: Id<"_storage">): string{
//     return `${process.env.NEXT_PUBLIC_CONVEX_URL}/api/storage/${fileId}}`;
// }






// function getFileUrl(fileId: Id<"_storage">) {
//     return useQuery(api.storage.getUrl, { fileId });
//   }

//   export function FileCard({ file }: {file: Doc<"files">}){
//     const fileUrl = getFileUrl(file.fileId);
//     const typeIcons = {
//         image: <ImageIcon/>,
//         pdf: <FileTextIcon/>,
//         csv: <GanttChartIcon/>,
//     } as Record<Doc<"files">["type"], ReactNode>;


//     return (
//         <Card>
//   <CardHeader className="relative">
//     <CardTitle className="flex gap-2">
//         <div className="flex justify-center">{typeIcons[file.type]}</div>{" "}
//     {file.name}
//     </CardTitle>
//        <div className="absolute top-2 right-2">
//         <FileCardActions file={file} />
//         </div>
//   </CardHeader>
//   <CardContent className="h-[200px] flex justify-center items-center">
//    {file.type === "image" && (
//     <Image alt={file.name}
//     width="200"
//     height="100"
//     src={getFileUrl(file.fileId)}
//     />
//    )}

// {file.type === "csv" && <GanttChartIcon className="w-20 h-20" />}
// {file.type === "pdf" && <FileTextIcon className="w-20 h-20" />}
    
//   </CardContent>
//   <CardFooter className="flex justify-center">
//     <Button onClick={() => {
//         if (fileUrl) window.open(fileUrl, "_blank");
//         // window.open(getFileUrl(file.fileId), "_blank");
//     }}>Download</Button>
//   </CardFooter>
// </Card>

//     )
//   }



// Correctly use the hook inside the component
export function FileCard({ file }: { file: Doc<"files"> }) {
    const { toast } = useToast();
    const fileUrl = useQuery(api.storage.getUrl, { fileId: file.fileId });
    
    const typeIcons = {
      image: <ImageIcon />,
      pdf: <FileTextIcon />,
      csv: <GanttChartIcon />,
    } as Record<Doc<"files">["type"], ReactNode>;
  
    return (
      <Card>
        <CardHeader className="relative">
          <CardTitle className="flex gap-2">
            <div className="flex justify-center">{typeIcons[file.type]}</div>
            {file.name}
          </CardTitle>
          <div className="absolute top-2 right-2">
            <FileCardActions file={file} />
          </div>
        </CardHeader>
  
        <CardContent className="h-[200px] flex justify-center items-center">
          {file.type === "image" && fileUrl && (
            <Image alt={file.name} width="200" height="100" src={fileUrl} />
          )}
  
          {file.type === "csv" && <GanttChartIcon className="w-20 h-20" />}
          {file.type === "pdf" && <FileTextIcon className="w-20 h-20" />}
        </CardContent>
  
        <CardFooter className="flex justify-center">
          <Button
            onClick={() => {
              if (fileUrl) {
                window.open(fileUrl, "_blank");
              } else {
                toast({
                  variant: "destructive",
                  title: "Error",
                  description: "File URL is not available.",
                });
              }
            }}
          >
            Download
          </Button>
        </CardFooter>
      </Card>
    );
  }
  