/* eslint-disable no-empty */
/* eslint-disable no-useless-catch */
import config from "../config/config";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(config.appwriteURL)
            .setProject(config.appwriteProjectId);

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            console.log("Post Data:", { title, slug, content, featuredImage, status, userId }); // Debugging
    
            return await this.databases.createDocument(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                slug,
                { title, content, featuredImage, status, userId }
            );
        } catch (error) {
            console.error("Error creating post:", error); // Debugging
            throw error;
        }
    }
    
    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                slug,
                { title, content, featuredImage, status }
            );
        } catch (error) {
            throw error;
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                slug
            );
            return true;
        } catch (error) {
            throw error;
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                slug
            );
        } catch (error) {
            throw error;
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                queries
            );
        } catch (error) {
            throw error;
        }
    }

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                config.appwriteBucketID,  // ✅ Corrected Key
                ID.unique(),
                file
            );
        } catch (error) {
            throw error;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                config.appwriteBucketID, // ✅ Corrected Key
                fileId
            );
            return true;
        } catch (error) {
            throw error;
        }
    }

    getFilePreview(fileId) {
        return this.bucket.getFilePreview(
            config.appwriteBucketID, // ✅ Corrected Key
            fileId
        );
    }
}

const service = new Service();
export default service;
