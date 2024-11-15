import { UniqueEntityID } from "./unique-entity.-id";

interface UploaderProps {
  title: string;
  url: string;
}

export class Uploader {
  private props: UploaderProps;
  constructor(props: UploaderProps) {
    this.props = props;
  }

  get title() {
    return this.props.title;
  }

  get url() {
    return this.props.url;
  }

  static create(props: UploaderProps, id?: UniqueEntityID) {
    const uploader = new Uploader(props);

    return uploader;
  }
}
