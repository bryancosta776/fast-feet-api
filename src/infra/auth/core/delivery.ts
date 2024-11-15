export interface DeliveryProps {
  fileName: string;
  fileType: string;
  url: string;
}

export class Delivery {
  private props: DeliveryProps;

  constructor(props: DeliveryProps) {
    this.props = props;
  }

  get fileName() {
    return this.props.fileName;
  }

  get fileType() {
    return this.props.fileType;
  }

  get url() {
    return this.props.url;
  }

  static create(props: DeliveryProps) {
    const delivery = new Delivery({
      ...props,
    });

    return delivery;
  }
}
