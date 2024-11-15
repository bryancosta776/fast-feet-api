import { UniqueEntityID } from "./unique-entity.-id";

export class Entity<Props> {
  private _id: UniqueEntityID;
  protected props: Props;

  get id() {
    return this._id.toString();
  }

  protected constructor(props: Props, id?: UniqueEntityID) {
    this.props = props;
    this._id = id ?? new UniqueEntityID();
  }

  public equals(entity: Entity<unknown>) {
    if (entity === this) {
      return true;
    }

    if (entity.id === this._id.toString()) {
      return true;
    }

    return false;
  }
}
