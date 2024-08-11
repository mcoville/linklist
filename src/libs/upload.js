import toast from "react-hot-toast";

export async function upload(ev, callbackFn) {
  const file = ev.target.files[0];
  if (file) {
    const uploadPromise = new Promise((resolve, reject) => {
      const data = new FormData();
      data.set("file", file);
      fetch("/api/upload", {
        method: "POST",
        body: data,
      }).then(async (res) => {
        if (res.ok) {
          const link = await res.json();
          callbackFn(link);
          resolve(link);
        } else {
          reject();
        }
      });
    });

    await toast.promise(uploadPromise, {
      loading: "Uploading image...",
      success: "Image uploaded!",
      error: "Failed to upload image.",
    });
  }
}
