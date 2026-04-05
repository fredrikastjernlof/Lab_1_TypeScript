import "./style.scss";
import data from "./data/courses.json";

console.log(data);

// En kurs har en kod, ett namn, en progression och en kursplan. Progressionen kan vara A, B eller C.
type Progression = "A" | "B" | "C" ;

// Skapar en mall för hur en kurs ska se ut. 
interface CourseInfo{
  code: string;
  name: string;
  progression: Progression;
  syllabus: string;
}

// En kurs får bara innehålla CourseInfo-objekt. 
const courses: CourseInfo[] = [];

console.log(courses);