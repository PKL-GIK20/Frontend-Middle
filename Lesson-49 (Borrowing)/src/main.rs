struct Mahasiswa {
    id: u32,
    name: String,
    grades: Vec<u32>,
}

impl Mahasiswa {
    fn new(id: u32, name: String) -> Self {
        Mahasiswa {
            id,
            name,
            grades: Vec::new(),
        }
    }

    fn add_grade(&mut self, grade: u32) {
        self.grades.push(grade);
    }

    fn average_grade(&self) -> f64 {
        let sum: u32 = self.grades.iter().sum();
        let count = self.grades.len() as u32;
        f64::from(sum) / f64::from(count)
    }
}

fn main() {
    let mut mahasiswa = Mahasiswa::new(1, String::from("Away"));
    mahasiswa.add_grade(85);
    mahasiswa.add_grade(92);
    mahasiswa.add_grade(78);

    let avg_grade = mahasiswa.average_grade();

    println!(
        "Mahasiswa ID: {}\nNama Mahasiswa: {}\nRata rata: {:.2}",
        mahasiswa.id, mahasiswa.name, avg_grade
    );
}
