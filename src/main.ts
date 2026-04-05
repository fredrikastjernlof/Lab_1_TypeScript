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

const form = document.getElementById("courseForm") as HTMLFormElement;
const codeInput = document.getElementById("code") as HTMLInputElement;
const nameInput = document.getElementById("name") as HTMLInputElement;
const progressionSelect = document.getElementById("progression") as HTMLSelectElement;
const syllabusInput = document.getElementById("syllabus") as HTMLInputElement;

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const newCourse: CourseInfo = {
    code: codeInput.value.toUpperCase(),
    name: nameInput.value,
    progression: progressionSelect.value as Progression,
    syllabus: syllabusInput.value
  };

  console.log(newCourse);
})