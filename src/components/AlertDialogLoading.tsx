import { Loader2 } from "lucide-react"
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogTitle } from "./ui/alert-dialog"

export const AlertDialogLoading = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="max-w-[360px]">
        <div className="flex flex-col items-center justify-center p-4 space-y-4">
          <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
          <div className="space-y-2 text-center">
            <AlertDialogTitle>Sedang Menganalisis...</AlertDialogTitle>
            <AlertDialogDescription>
              Mohon tunggu sejenak, kami sedang memproses data anda.
            </AlertDialogDescription>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}