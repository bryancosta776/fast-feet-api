import { DomainEvent } from "../events/domain-event";
import { DomainEvents } from "../events/domain-events";
import { Entity } from "./entity";

// Todo agregado tem uma entidade que é a entidade pai, entidade raiz
// Representa a entidade Raiz
export abstract class AggregateRoot<Props> extends Entity<Props> {
  private _domainEvents: DomainEvent[] = [];

  get domainEvents(): DomainEvent[] {
    return this._domainEvents;
  }

  protected addDomainEvent(domainEvent: DomainEvent): void {
    this._domainEvents.push(domainEvent);
    DomainEvents.markAggregateForDispatch(this);
  }

  public clearEvents() {
    this._domainEvents = [];
  }
}
