import { Button } from "@/components/ui/button";
import { OrganizationSwitcher, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export function Header(){
    return (
        <div className="border-b">
            <div className="items-center container mx- justify-between flex">
                <div>FileDrive</div>
                <div className="flex gap-2">
                    <OrganizationSwitcher />
                <UserButton />
                <SignedOut>
                <SignInButton>
                <Button>Sign In</Button>
                </SignInButton>
                </SignedOut> 
                </div>
            </div>
        </div>
    )
}