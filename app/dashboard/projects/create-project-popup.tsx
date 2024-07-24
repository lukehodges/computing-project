"use client"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

// Create a schema using zod
const formSchema = z.object({
    name: z.string().min(1, { message: "Title is required." }),
    description: z.string().optional(),
})

export default function TaskPopup({ children }) {
    const router = useRouter();
    const [formStep, setFormStep] = useState(0)
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name:"",
            description:""
        },
    })

    const onSubmit = (values) => {
        console.log("Form Submitted:", JSON.stringify(values))
        fetch("/api/project/", {
          headers: {
            'Content-Type': 'application/json'
          },
            method: "POST",
            body: JSON.stringify(values)
        }).then(response => {
            console.log("done", response);
            setopen(false)
            router.refresh();
            // redirect("/dashboard/tasks/task1    ")
            
        }
        )


        // Add form submission logic here
    }

    const [open,setopen] = useState(false)
    return (
        <Dialog open={open} onOpenChange={setopen}>
            <DialogTrigger asChild>
                {children}  
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create project</DialogTitle>
                    <DialogDescription>
                        Add a new project with the necessary details.
                    </DialogDescription>
                </DialogHeader>
                <Form  {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Title</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Project Name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Textarea placeholder="Project Description" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <DialogFooter>
                                    <Button variant="outline" type="button" onClick={() =>{
                                        setopen(false)
                                        form.reset()
                                        }}>
                                        Cancel
                                    </Button>
                                    <Button type="submit" >
                                        Submit
                                    </Button>
                                </DialogFooter>
                            
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
