const config={
    appwriteURL:String(import.meta.env.VITE_APPWRITE_URLY),
    appwriteProjectId:(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseID:(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionID:(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteBuketID:(import.meta.env.VITE_APPWRITE_BUCKET_ID),


}

export default config