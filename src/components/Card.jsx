import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Card = ({ classes, getClasses }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState(undefined);

    const handleDelete = () => {
        const storage = localStorage.getItem("classes");
        if (storage) {
            const classes = JSON.parse(storage);
            const filtered = classes.filter((item) => item.name !== name);
            localStorage.setItem("classes", JSON.stringify(filtered));
        }
        getClasses();
        toast.success("Class deleted successfully!")
        setIsModalOpen(false);
    }

    const fileType = (language) => {
        if (language == "javascript") {
            return ".js";
        } else if (language == "python") {
            return ".py";
        } else if (language == "java") {
            return ".java";
        }
    };

    return (
        <div className="flex flex-row flex-wrap justify-center gap-[4rem]">
            {classes.map((item, index) => {
                return (
                    <div
                        key={index}
                        className="transition hover:scale-105 hover:border-current border-2 border-transparent card w-[20rem] bg-neutral text-neutral-content"
                    >
                        <label
                            htmlFor="my-modal1"
                            onClick={() => {
                                setName(item.name);
                                setIsModalOpen(true);
                            }}
                            class="btn btn-sm btn-circle hover:text-error absolute right-2 top-2"
                        >
                            ✕
                        </label>
                        <Link to={"/editor/" + index + "/" + item.id}>
                            <div className="card-body items-center text-center">
                                <img
                                    src={item.language + ".png"}
                                    width={50}
                                    height={50}
                                    alt="img"
                                />
                                <h2 className="card-title">
                                    {item.name}
                                    {fileType(item.language)}
                                </h2>
                                <p>{item.description}</p>
                            </div>
                        </Link>
                    </div>
                );
            })}
            {isModalOpen && (
                <input
                    type="checkbox"
                    id="my-modal1"
                    className="modal-toggle"
                />
            )}
            {isModalOpen && (
                <label for="my-modal1" className="modal cursor-pointer">
                    <label className="modal-box relative">
                        {/* <label
                            htmlFor="my-modal1"
                            class="hover:text-white text-2xl absolute left-2 top-2"
                        >
                            {"<"}
                        </label> */}
                        <h3 className="text-xl text-primary-content mt-4">
                            Are you sure you want to delete {name}?
                        </h3>
                        <div className="modal-action">
                            <label
                                onClick={handleDelete}
                                className="btn btn-error"
                            >
                                Delete
                            </label>
                        </div>
                    </label>
                </label>
            )}
        </div>
    );
};

export default Card;
