import "./style.scss";
import data from "./data/courses.json";

console.log(data);

// En kurs har en kod, ett namn, en progression och en kursplan. Progressionen kan vara A, B eller C.
type Progression = "A" | "B" | "C";

// Skapar en mall för hur en kurs ska se ut. 
interface CourseInfo {
  code: string;
  name: string;
  progression: Progression;
  syllabus: string;
}

interface RawCourse {
  code: string;
  coursename: string;
  progression: Progression;
  syllabus: string;
}

const availableCourses: CourseInfo[] = (data as RawCourse[]).map((course) => ({
  code: course.code.toUpperCase(),
  name: course.coursename,
  progression: course.progression,
  syllabus: course.syllabus
}));

// En kurs får bara innehålla CourseInfo-objekt. 
const courses: CourseInfo[] = [];

console.log(courses);

const form = document.getElementById("courseForm") as HTMLFormElement;
const courseSelect = document.getElementById("courseSelect") as HTMLSelectElement;
const codeInput = document.getElementById("code") as HTMLInputElement;
const nameInput = document.getElementById("name") as HTMLInputElement;
const progressionSelect = document.getElementById("progression") as HTMLSelectElement;
const syllabusInput = document.getElementById("syllabus") as HTMLInputElement;
const courseList = document.getElementById("courseList") as HTMLUListElement;

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const newCourse: CourseInfo = {
    code: codeInput.value.toUpperCase(),
    name: nameInput.value,
    progression: progressionSelect.value as Progression,
    syllabus: syllabusInput.value
  };

  courses.push(newCourse);
  renderCourses();
  console.log(newCourse);
});

 courseSelect.addEventListener("change", () => {
    fillFormWithCourse(courseSelect.value);
  });

function populateCourseSelect(): void {
  availableCourses.forEach((course) =>{
    const option =document.createElement("option");
    option.value = course.code;
    option.textContent = `${course.code} - ${course.name}`;
    courseSelect.appendChild(option);
  });
}

function fillFormWithCourse (code: string): void {
  const selectedCourse = availableCourses.find(
    (course) => course.code === code
  );

  if (!selectedCourse) return;

  codeInput.value = selectedCourse.code;
  nameInput.value = selectedCourse.name;
  progressionSelect.value = selectedCourse.progression;
  syllabusInput.value = selectedCourse.syllabus;  
}

function renderCourses(): void {

  //Rensa tidigare lista
  courseList.innerHTML = "";

  courses.forEach((course) => {
    const li = document.createElement("li");
    li.innerHTML = `
    <strong>${course.code}</strong> - ${course.name} (${course.progression})
    <br>
    <a href="${course.syllabus}" target="_blank"> Kursplan</a>
    `;

    courseList.appendChild(li);
  });
}

populateCourseSelect();