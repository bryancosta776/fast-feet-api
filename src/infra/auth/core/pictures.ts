import { Entity } from "../entities/entity";
import { UniqueEntityID } from "../entities/unique-entity.-id";

export interface PicturesProps   {
    shipmentId: string 
    id: string
    fileName: string;
    fileType: string;
    body: string;
    url: string    
}

export class Pictures extends Entity<PicturesProps>{
    get shipmentId(){
        return this.props.shipmentId
    }
    get fileName(){
        return this.props.fileName
    }

    get fileType(){
        return this.props.fileType
    }

    get body(){
        return this.props.body 
    }

    get url(){
        return this.props.url
    }

    

    static create(props: PicturesProps, id?: UniqueEntityID) {
        const pictures = new Pictures({
          ...props,
          id: id?.toString() ?? ''
           
        });
    
        return pictures;
      }
}   
