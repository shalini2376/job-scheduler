import { useState } from "react";
import { createJob } from "../services/jobApi";

function CreateJobForm({onJobCreated}){
    const [taskName, setTaskName] = useState('');
    const [priority, setPriority] = useState('Medium');
    const [payload, setPayload] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!taskName.trim()){
            setError('Task is required');
            return;
        }

        let parsedPayload = {};
        if (payload.trim()){
            try{ 
                parsedPayload = JSON.parse(payload)
            } catch {
                setError('Payload must be valid JSON');
                return;
            }
        }
        setError('');
        setLoading(true);

        await createJob({
            taskName,
            priority,
            payload: parsedPayload
        });
        setLoading(false);

        setTaskName('');
        setPriority('Medium');
        setPayload('');

        onJobCreated();
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-10 w-full max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="w-full max-w-md  p-5 ">
                <h2 className="text-2xl font-semibold text-center">Create Job</h2>
                {error && <p className="text-red-600">{error}</p>}
                <div className="my-2">
                    <label className="text-xl">Task Name</label>
                    <br/>
                    <input 
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 my-3
                            focus:outline-none focus:ring-2 focus:ring-blue-500
                            focus:border-blue-500"
                        type="text"
                        placeholder="job Name"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                    />
                </div>
                <div className="my-2">
                    <label className="text-xl">Priority</label>
                    <br />
                    <select 
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 my-3
                            focus:outline-none focus:ring-2 focus:ring-blue-500
                            focus:border-blue-500"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                    >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>
                <div className="my-2">
                    <label className="text-xl">Payload (JSON)</label>
                    <br />
                    <textarea 
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 my-3
                            focus:outline-none focus:ring-2 focus:ring-blue-500
                            focus:border-blue-500"
                        rows="4" 
                        value={payload}
                        onChange={(e) => setPayload(e.target.value)}
                        placeholder='{"email": "test@gmail.com"}'
                    />
                </div>
                <button type="submit" disabled={loading} className=" text-xl bg-green-600 text-white px-4 py-2 rounded">
                    {loading ? 'Creating...' : 'Create Job'}
                </button>
            </form>
        </div>
    )

}
export default CreateJobForm