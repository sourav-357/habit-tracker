import * as React from "react"
import { cn } from "@/utils/cn"

const Dialog = React.forwardRef(({ className, ...props }, ref) => {
    const [open, setOpen] = React.useState(false)

    return (
        <div ref={ref} className={cn("", className)} {...props} data-open={open} data-set-open={setOpen} />
    )
})
Dialog.displayName = "Dialog"

const DialogTrigger = React.forwardRef(
    ({ className, children, ...props }, ref) => {
        return React.cloneElement(children, {
            ...props,
            ref,
            className: cn(children.props.className, className),
        })
    }
)
DialogTrigger.displayName = "DialogTrigger"

const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            className
        )}
        {...props}
    />
))
DialogOverlay.displayName = "DialogOverlay"

const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
        <DialogOverlay />
        <div
            ref={ref}
            className={cn(
                "relative z-50 w-full max-w-lg gap-4 border border-border bg-background p-6 shadow-lg duration-200 rounded-lg",
                className
            )}
            {...props}
        >
            {children}
        </div>
    </div>
))
DialogContent.displayName = "DialogContent"

const DialogHeader = ({ className, ...props }) => (
    <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...props} />
)
DialogHeader.displayName = "DialogHeader"

const DialogFooter = ({ className, ...props }) => (
    <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />
)
DialogFooter.displayName = "DialogFooter"

const DialogTitle = React.forwardRef(({ className, ...props }, ref) => (
    <h2
        ref={ref}
        className={cn("text-lg font-semibold leading-none tracking-tight", className)}
        {...props}
    />
))
DialogTitle.displayName = "DialogTitle"

const DialogDescription = React.forwardRef(({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
))
DialogDescription.displayName = "DialogDescription"

export {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription,
    DialogOverlay,
}
