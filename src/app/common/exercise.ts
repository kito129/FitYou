export class Exercise {
  key?: string;
  name?: string;
  description?: string;
  dateCreated?: number;
  lastUpdate?: number;
  urlLink?: any;
  userUid?: string;

  constructor()
  constructor(name: string, description: string)
  constructor(name?: string, description?: string) {

    this.name = name;
    this.description = description;
    this.lastUpdate = Date.now();
    this.dateCreated = Date.now();
  }
}
