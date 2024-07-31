"use client";
import React from "react";
import {cn} from "@/lib/utils.ts";
import {IoAccessibility, IoEllipsisVertical, IoLocationOutline} from "react-icons/io5";
import {SubmitHandler, useForm} from "react-hook-form";
import ComboBox from "./select";
import useLocationQueryStore from "@/hooks/useLocationStore";

interface IFormInput {
    from: string;
    to: string;
}

function Form() {
    const setFrom = useLocationQueryStore(s => s.setFrom);
    const setTo = useLocationQueryStore(s => s.setTo);
    const {register, handleSubmit, formState: {errors}} = useForm<IFormInput>();


    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        if (data.from && data.to) {
            setFrom(data.from);
            setTo(data.to);
        }
    };

    return (
        <div
            className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
            <h2 className="font-bold text-neutral-800 text-2xl dark:text-neutral-200">
                Welcome <br/>to London Navigator
            </h2>
            <p className="text-neutral-600 text-lg max-w-sm mt-2 dark:text-neutral-300">
                Where do you want to go?
            </p>

            <form className="my-8" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-row space-y-2 md:space-y-0 mb-4">
                    <div className='items-center'>
                        <IoAccessibility size={25} color='green'/>
                        <IoEllipsisVertical size={18} className='ml-1 mt-3'/>
                        <IoEllipsisVertical size={18} className='ml-1'/>
                        <IoEllipsisVertical size={18} className='ml-1 mb-3'/>
                        <IoLocationOutline size={25} color='red'/>
                    </div>
                    <div>
                        <LabelInputContainer className='mb-12 ml-3'>
                            <ComboBox type='from'  {...register("from", {required: true})} />
                            {errors.from && <h5 className='text-red-700/50'><span>You missed this field</span></h5>}
                        </LabelInputContainer>
                        <LabelInputContainer className='mt-6 ml-3'>
                            <ComboBox type='to'  {...register("to", {required: true})} />
                            {errors.to && <h5 className='text-red-700/50'><span>You missed this field</span></h5>}
                        </LabelInputContainer>
                    </div>
                </div>
                {/*<button*/}
                {/*    className={`bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset] ${(!fromValue || !toValue) ? 'opacity-50 cursor-not-allowed' : ''}`}*/}
                {/*    type="submit"*/}
                {/*    disabled={!locationQuery.from || !locationQuery.to}*/}
                {/*>*/}
                {/*    Find &rarr;*/}
                <BottomGradient/>
                {/*</button>*/}

                <div
                    className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full"/>
            </form>
        </div>
    );
}

const BottomGradient = () => {
    return (
        <>
            <span
                className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"/>
            <span
                className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent"/>
        </>
    );
};

const LabelInputContainer = ({
                                 children,
                                 className,
                             }: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn("flex flex-col space-y-2 w-full", className)}>
            {children}
        </div>
    );
};

export default Form;
