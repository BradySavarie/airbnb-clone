import axios from 'axios';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';

type PhotosUploaderProps = {
    addedPhotos: string[];
    onChange: Dispatch<SetStateAction<string[]>>;
};

export default function PhotosUploader({
    addedPhotos,
    onChange,
}: PhotosUploaderProps) {
    const [photoLink, setPhotoLink] = useState('');

    async function addPhotoByLink(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        const { data: filename } = await axios.post('/upload-by-link', {
            link: photoLink,
        });
        onChange((prev) => {
            return [...prev, filename];
        });
        setPhotoLink('');
    }

    function uploadPhoto(e: ChangeEvent<HTMLInputElement>) {
        const files: FileList | null = e.target.files;

        if (files) {
            const data = new FormData();
            for (let i = 0; i < files.length; i++) {
                const file: File = files[i];
                data.append('photos', file);
            }
            axios
                .post('/upload', data, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                })
                .then((response) => {
                    const { data: filenames } = response;
                    onChange((prev) => {
                        return [...prev, ...filenames];
                    });
                });
        }
    }

    return (
        <>
            <div className="flex gap-2">
                <input
                    type="text"
                    value={photoLink}
                    onChange={(e) => setPhotoLink(e.target.value)}
                    placeholder="Add using a link ...jpg"
                />
                <button
                    onClick={addPhotoByLink}
                    className="bg-gray-200 px-4 rounded-2xl"
                >
                    Add&nbsp;Photo
                </button>
            </div>
            <div className="grid grid-cols-3 gap-2 md:grid-cols-4 lg:grid-cols-6 mt-2">
                {addedPhotos.length > 0 &&
                    addedPhotos.map((link) => (
                        <div key={link}>
                            <img
                                className="max-h-48 rounded-2xl object-cover aspect-square"
                                src={'http://localhost:4000/uploads/' + link}
                                alt="property photo"
                            />
                        </div>
                    ))}
                <label className="flex items-center justify-center gap-1 py-8 border bg-transparent rounded-2xl text-2xl text-gray-600 cursor-pointer">
                    <input
                        type="file"
                        className="hidden"
                        onChange={uploadPhoto}
                        multiple
                    />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-8 h-8"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                        />
                    </svg>
                    Upload
                </label>
            </div>
        </>
    );
}
