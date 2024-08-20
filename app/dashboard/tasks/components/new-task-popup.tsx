"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { SelectTrigger, Select, SelectValue, SelectItem, SelectContent } from "@/components/ui/select"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { redirect, useRouter } from "next/navigation"

// Create a schema using zod
const formSchema = z.object({
    title: z.string().min(1, { message: "Title is required." }),
    description: z.string().optional(),
    status: z.enum(["TODO", "IN_PROGRESS", "DONE"], { required_error: "Please select a status." }),
    priority: z.number().int().min(1, { message: "Priority must be at least 1." }),
    dueDate: z.date(),
    startDate: z.date(),
    estimatedHours: z.number().positive(),
})
type TaskPopupProps =  {
    children:React.ReactNode
}
export default function TaskPopup({ children }:TaskPopupProps) {
    const router = useRouter();
    const [formStep, setFormStep] = useState(0)
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            status: "TODO",
            priority: 1,
            dueDate: new Date(),
            startDate: new Date(),
            estimatedHours: 0,
        },
    })

    const onSubmit = (values: any) => {
        console.log("Form Submitted:", JSON.stringify(values))
        fetch("/api/tasks/", {
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

    const nextStep = () => setFormStep(1)
    const prevStep = () => setFormStep(0)
    const [open,setopen] = useState(false)
    return (
        <Dialog open={open} onOpenChange={setopen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Task</DialogTitle>
                    <DialogDescription>
                        Add a new task with the necessary details.
                    </DialogDescription>
                </DialogHeader>
                <Form  {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        {formStep === 0 && (
                            <>
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Title</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Task title" {...field} />
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
                                                <Textarea placeholder="Task description" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="startDate"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel>Start Date</FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant={"outline"}
                                                            className={cn(
                                                                "w-[240px] pl-3 text-left font-normal",
                                                                !field.value && "text-muted-foreground"
                                                            )}
                                                        >
                                                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={field.value}
                                                        onSelect={field.onChange}
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="dueDate"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel>Due Date</FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant={"outline"}
                                                            className={cn(
                                                                "w-[240px] pl-3 text-left font-normal",
                                                                !field.value && "text-muted-foreground"
                                                            )}
                                                        >
                                                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={field.value}
                                                        onSelect={field.onChange}
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
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
                                    <Button type="button" onClick={nextStep}>
                                        Next
                                    </Button>
                                </DialogFooter>
                            </>
                        )}
                        {formStep === 1 && (
                            <>
                                <FormField
                                    control={form.control}
                                    name="status"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Status</FormLabel>
                                            <FormControl>
                                                <Select {...field} onValueChange={field.onChange}>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a status" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="TODO">TODO</SelectItem>
                                                        <SelectItem value="IN_PROGRESS">IN_PROGRESS</SelectItem>
                                                        <SelectItem value="DONE">DONE</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="priority"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Priority</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="1"
                                                    value={field.value}
                                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="estimatedHours"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Estimated Hours</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    step="0.1"
                                                    placeholder="Estimated hours"
                                                    value={field.value}
                                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <DialogFooter>
                                    <Button variant="outline" type="button" onClick={prevStep}>
                                        Back
                                    </Button>
                                    <Button type="submit">Continue</Button>
                                </DialogFooter>
                            </>
                        )}
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
