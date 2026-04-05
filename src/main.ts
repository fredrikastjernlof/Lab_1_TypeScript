import "./style.scss";
import data from "./data/courses.json";

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

const storageKey: string = "courses";

const form = document.getElementById("courseForm") as HTMLFormElement;
const courseSelect = document.getElementById("courseSelect") as HTMLSelectElement;
const codeInput = document.getElementById("code") as HTMLInputElement;
const nameInput = document.getElementById("name") as HTMLInputElement;
const progressionSelect = document.getElementById("progression") as HTMLSelectElement;
const syllabusInput = document.getElementById("syllabus") as HTMLInputElement;
const courseList = document.getElementById("courseList") as HTMLUListElement;
const clearCoursesBtn = document.getElementById("clearCoursesBtn") as HTMLButtonElement;
const sortCoursesSelect = document.getElementById("sortCourses") as HTMLSelectElement;

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const newCourse: CourseInfo = {
    code: codeInput.value.toUpperCase(),
    name: nameInput.value,
    progression: progressionSelect.value as Progression,
    syllabus: syllabusInput.value
  };

  //Kontrollerar om någon kurs redan har samma kod och stoppar tillägg om kursen redan finns i listan
  const exists = courses.some(
    (course) => course.code === newCourse.code
  );

  if (exists) {
    alert("Kursen finns redan i listan");
    return;
  }

  courses.push(newCourse);
  saveCoursesToStorage();
  renderCourses();
  resetForm();

});

courseSelect.addEventListener("change", () => {
  fillFormWithCourse(courseSelect.value);
});

codeInput.addEventListener("input", resetCourseSelect);
nameInput.addEventListener("input", resetCourseSelect);
progressionSelect.addEventListener("change", resetCourseSelect);
syllabusInput.addEventListener("input", resetCourseSelect);

sortCoursesSelect.addEventListener("change", () => {
  renderCourses();
});

clearCoursesBtn.addEventListener("click", () => {
  clearCourses();
});

function populateCourseSelect(): void {
  availableCourses.forEach((course) => {
    const option = document.createElement("option");
    option.value = course.code;
    option.textContent = `${course.code} - ${course.name}`;
    courseSelect.appendChild(option);
  });
}

function fillFormWithCourse(code: string): void {
  const selectedCourse = availableCourses.find(
    (course) => course.code === code
  );

  if (!selectedCourse) return;

  codeInput.value = selectedCourse.code;
  nameInput.value = selectedCourse.name;
  progressionSelect.value = selectedCourse.progression;
  syllabusInput.value = selectedCourse.syllabus;
}

function resetForm(): void {
  form.reset();
  courseSelect.value = "";
}

function resetCourseSelect(): void {
  courseSelect.value = "";
}

function getSortedCourses(): CourseInfo[] {
  const sortedCourses = [...courses];

  if (sortCoursesSelect.value === "name-asc") {
    sortedCourses.sort((a, b) => a.name.localeCompare(b.name));
  }

  if (sortCoursesSelect.value === "name-desc") {
    sortedCourses.sort((a, b) => b.name.localeCompare(a.name));
  }

  return sortedCourses;
}

function renderCourses(): void {
  courseList.innerHTML = "";

  getSortedCourses().forEach((course) => {
    const li = document.createElement("li");

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Ta bort";

    deleteBtn.addEventListener("click", () => {
      removeCourse(course.code);
    });

    li.innerHTML = `
      <strong>${course.code}</strong> - ${course.name} (${course.progression})
      <br>
      <a href="${course.syllabus}" target="_blank">Kursplan</a>
    `;

    li.appendChild(deleteBtn);
    courseList.appendChild(li);
  });
}

function removeCourse(code: string): void {
  const index = courses.findIndex((course) => course.code === code);

  if (index !== -1) {
    courses.splice(index, 1);
    saveCoursesToStorage();
    renderCourses();
  }
}

function clearCourses(): void {
  courses.length = 0;
  saveCoursesToStorage();
  renderCourses();
}

function saveCoursesToStorage(): void {
  localStorage.setItem(storageKey, JSON.stringify(courses));
}

function loadCoursesFromStorage(): void {
  const storedCourses = localStorage.getItem(storageKey);

  if (!storedCourses) {
    return;
  }

  const parsedCourses: CourseInfo[] = JSON.parse(storedCourses);
  courses.push(...parsedCourses);
}

populateCourseSelect();
loadCoursesFromStorage();
renderCourses();