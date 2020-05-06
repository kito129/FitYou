import {WorkoutDetailExercise} from './workoutDetailExercise';

export class Workout {
  key?: string;
  name?: string;
  description?: string;
  dateCreated?: number;
  lastUpdate?: number;
  exerciseList?: WorkoutDetailExercise[];
  userUid?: string;

  constructor()
  constructor(name: string, description: string)
  constructor(name?: string, description?: string, exercise?: []) {

    this.name = name;
    this.description = description;
    this.lastUpdate = Date.now();
    this.dateCreated = Date.now();
    this.exerciseList = exercise;
  }
}
