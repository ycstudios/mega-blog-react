/* eslint-disable no-empty */
/* eslint-disable no-useless-catch */
import config from "../config/config";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
    client = new Client();
    databases;
    buket;

    constructor() {
        this.client
            .setEndpoint(config.appwriteURL)
            .setProject(config.appwriteProjectId);

        this.databases = new Databases(this.client);
        this.buket = new Storage(this.client);
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                slug,
                { title, content, featuredImage, status, userId }
            );
        } catch (error) {
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

    async deletePost(slug){
        try {
             await this.databases.deleteDocument(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                slug
             )
             return true
            
        } catch (error) {
            throw error
        }

    }

    async getPost(slug){
        try{
            await this.databases.getDocument(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                slug
            )
        } catch(error){
            throw error
        }
        
    }

    async getPosts(queries = [Query.equal("status",'active')]){

        try{
            return await this.databases.listDocuments(
                config.appwriteDatabaseID,
                config.appwriteCollectionID,
                queries


                       )

        } catch (error){
            throw error
        }

    }

    async uploadFile(file){
        try {
            return await this.buket.createFile(
                config.appwriteBuketID,
                ID.unique(),
                file
            )   
        } catch (error) {
            throw error
            
        }


    }

    async deleteFile(fileId){
        try {

             await this.buket.deleteFile(
                config.appwriteBuketID,
                fileId
            )
            return true
            

        } catch (error) {
            throw error
            
        }
    }

     getfilePrevew(fileId){
        return this.buket.getFilePreview(
            config.appwriteBuketID,
            fileId
        )


     }

}

const service = new Service();
export default service;
