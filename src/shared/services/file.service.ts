import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { firebaseStorage } from "src/firebase";
import { v4 as uuidv4 } from "uuid";

/**
 * Upload file to firebase storage.
 *
 * @param file The file to upload.
 * @returns The file url.
 */
export const uploadFile = async (
  file: File,
  folder: string
): Promise<string> => {
  const fileId = uuidv4();
  const storageRef = ref(firebaseStorage, `${folder}/${fileId}`);
  const result = await uploadBytes(storageRef, file);
  const fileUrl = getDownloadURL(result.ref);

  return fileUrl;
};
