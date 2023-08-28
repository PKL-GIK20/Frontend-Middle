fn main() {
    let s = String::from("Hello, Rust!");

    let len = calculate_length(&s);

    println!("Kalimat: {}", s);
    println!("Panjang string: {}", len);
}

fn calculate_length(s: &String) -> usize {
    s.len()
}

