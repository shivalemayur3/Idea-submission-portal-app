import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import * as Label from '@radix-ui/react-label';

export function IdeaForm() {
    const [employees, setEmployees] = useState([]);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const router = useRouter();

    const fetchEmployees = async () => {
        const res = await fetch('../employees.json');
        const data = await res.json();
        setEmployees(data);
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const onSubmit = async (data) => {
        await fetch('/api/ideas/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        router.push('/');
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-xl mx-auto mt-8 p-4 border rounded-xl shadow-md bg-white">
            <div>
                <Label.Root className="block mb-1 font-medium">Summary <span className="text-red-500">*</span></Label.Root>
                <input {...register('summary', { required: true })} className="w-full p-2 border rounded" placeholder="Summary" />
                {errors.summary && <span className="text-red-500 text-sm">Summary is required</span>}
            </div>
            <div>
                <Label.Root className="block mb-1 font-medium">Description <span className="text-red-500">*</span></Label.Root>
                <textarea {...register('description', { required: true })} className="w-full p-2 border rounded" placeholder="Description" />
                {errors.description && <span className="text-red-500 text-sm">Description is required</span>}
            </div>
            <div>
                <Label.Root className="block mb-1 font-medium">Employee <span className="text-red-500">*</span></Label.Root>
                <select {...register('employee', { required: true })} className="w-full p-2 border rounded">
                    <option value="">Select an employee</option>
                    {employees.map(emp => <option key={emp.id} value={emp.name}>{emp.name}</option>)}
                </select>
                {errors.employee && <span className="text-red-500 text-sm">Employee is required</span>}
            </div>
            <div>
                <Label.Root className="block mb-1 font-medium">Priority</Label.Root>
                <select {...register('priority')} className="w-full p-2 border rounded">
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
            </div>
            <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">Submit</button>
        </form>
    );
}