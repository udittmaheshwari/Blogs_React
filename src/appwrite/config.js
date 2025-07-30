import conf from '../conf/conf'
import { Databases , Storage, Query , Client , ID } from 'appwrite'


export class Services{
client = new Client()
databases;
bucket;

constructor(){
     this.client.setEndpoint(conf.appwriteUrl) 
    .setProject(conf.appwriteProjectId);

    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client)
}

    async createPost({title,slug,content,featuredImage,status,userId}){
        try {
            return await this.databases(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
                

            )


        } catch (error) {
            console.log("error in appwrite->config.js createPost" , error);
            
        }


    }


    async updatePost(slug, {title ,content , featuredImage, status}){
        try {
        return await this.databases.updateDocument(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug,
            {
                title,
                content,
                featuredImage,
                status
            }
        )

        } catch (error) {
            console.log("error in appwrite->config.js updatePost" , error);
        }
}

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true;
        } catch (error) {
            console.log("error in appwrite->config.js deletepost" , error);
            return false;
        }
    }

 async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            
            )
        } catch (error) {
            console.log("error in appwrite->config.js getPost", error);
            return false
        }
    }


    async getPosts(queries=[Query.equal("status" , "active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
               queries,
            )



        } catch (error) {
            console.log("error in appwrite->config.js getPosts", error);
            return false;
        }


    }

    //file upload services ( can be in different file )


    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )

        } catch (error) {
            console.log("error in appwrite->config.js uploadFile", error);
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
            
        } catch (error) {
            console.log("error in appwrite->config.js deleteFile", error);
            return false;
        }
    }


     getFilePreview(fileId){
        try {
          this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
          )   
        } catch (error) {
            console.log("error in appwrite->config.js getfilepreview", error);
        }
     }






}

const services=new Services();
export default services