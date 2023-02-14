import { useState } from "react";
import toast from 'react-hot-toast';
import pb from "../pb/pocketbase";

const CreateClass = ({ getClasses }) => {
    const [language, setLanguage] = useState(undefined);
    const [name, setName] = useState(undefined);
    const [description, setDescription] = useState(undefined);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleChange = (e) => {
        setLanguage(e.target.value);
    };

    const appendToStorage = (data) => {
        const storage = localStorage.getItem("classes");
        if (storage) {
            const classes = JSON.parse(storage);
            classes.push(data);
            localStorage.setItem("classes", JSON.stringify(classes));
        } else {
            const classes = [];
            classes.push(data);
            localStorage.setItem("classes", JSON.stringify(classes));
        }
    };

    const handleCreate = async () => {
        if (!name || name == "") {
            toast.error("Please enter a class name");
            return;
        } else if (!language || language == "") {
            toast.error("Please select a language");
            return;
        }
        let code;
        if (language == "javascript") {
            code = `function hello() {
    console.log("Hello World!");
}

hello()`;
        } else if (language == "python") {
            code = `def hello():
    print("Hello World!")

hello()`;
        } else if (language == "java") {
            code = `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello World!");
    }
    
}`;
        }
        let data = {
            name: name,
            code: code,
            language: language,
        };

        if (description) {
            data.description = description;
        }

        const record = await pb.collection("classes").create(data);
        console.log(record);
        const storage = {
            id: record.id,
            name: record.name,
            description: description,
            language: record.language,
        };
        appendToStorage(storage);
        getClasses();
        toast.success("Class created successfully");
        setIsModalOpen(false);
    };

    return (
        <div>
            <label
                htmlFor="my-modal"
                className="btn btn-primary"
                onClick={() => setIsModalOpen(true)}
            >
                Create Class
            </label>
            {isModalOpen && (
                <input type="checkbox" id="my-modal" className="modal-toggle" />
            )}
            {isModalOpen && (
                <label for="my-modal" className="modal cursor-pointer">
                    <label className="modal-box relative">
                        <h3 className="font-bold text-xl text-primary-content">
                            Create New Class
                        </h3>
                        <p>
                            Please enter a proper class name and choose language
                        </p>
                        <div className="flex flex-col gap-4 py-4">
                            <input
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                                type="text"
                                placeholder="* Enter Class Name"
                                className="input input-bordered w-full"
                            />
                            <input
                                onChange={(e) => {
                                    setDescription(e.target.value);
                                }}
                                type="text"
                                placeholder="Enter a description to identify your class"
                                className="input input-bordered w-full"
                            />
                            <select
                                onChange={handleChange}
                                className="select select-bordered w-full"
                            >
                                <option disabled selected>
                                    * Choose a Language
                                </option>
                                <option value="javascript">Javascript</option>
                                <option value="python">Python</option>
                                <option value="java">Java</option>
                            </select>
                        </div>
                        <div className="modal-action">
                            <button
                                onClick={handleCreate}
                                htmlFor="my-modal"
                                className="btn btn-primary"
                            >
                                Create
                            </button>
                            {/* <label htmlFor="my-modal" className="btn btn-error">
                                Cancel
                            </label> */}
                        </div>
                    </label>
                </label>
            )}
        </div>
    );
};

export default CreateClass;
