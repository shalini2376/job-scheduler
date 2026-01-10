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
        <div className="flex items-center justify-center mt-5">
            <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-5 rounded-md shadow ">
                <h2 className="text-2xl font-semibold text-center">Create Job</h2>
                {error && <p>{error}</p>}
                <div>
                    <label>Task Name</label>
                    <br/>
                    <input 
                        className="border p-2 rounded w-full mb-4"
                        type="text"
                        placeholder="job Name"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                    />
                </div>
                <div>
                    <label>Priority</label>
                    <br />
                    <select 
                        className="border p-2 rounded w-full mb-4"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                    >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </div>
                <div>
                    <label>Payload (JSON)</label>
                    <br />
                    <textarea 
                        rows="4" 
                        value={payload}
                        className="border p-2 rounded w-full mb-4"
                        onChange={(e) => setPayload(e.target.value)}
                        placeholder='{"email": "test@gmail.com"}'
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Creating...' : 'Create Job'}
                </button>
            </form>
        </div>
    )

}
export default CreateJobForm