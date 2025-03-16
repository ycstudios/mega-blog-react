const config = {
    appwriteURL: String(import.meta.env.VITE_APPWRITE_URL), // Fixed typo
    appwriteProjectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    appwriteDatabaseID: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    appwriteCollectionID: import.meta.env.VITE_APPWRITE_COLLECTION_ID,
    appwriteBucketID: import.meta.env.VITE_APPWRITE_BUCKET_ID, // Fixed spelling "Buket" -> "Bucket"
};

export default config;
