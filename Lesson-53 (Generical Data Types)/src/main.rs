// Definisi modul untuk barang elektronik
mod electronics {
    pub struct Electronic<T> {
        pub name: String,
        pub brand: String,
        pub price: f64,
        pub specification: T,
    }

    impl<T> Electronic<T> {
        pub fn new(name: String, brand: String, price: f64, specification: T) -> Self {
            Electronic {
                name,
                brand,
                price,
                specification,
            }
        }
    }
}

// Definisi modul untuk pakaian
mod clothing {
    pub struct Clothing<T> {
        pub name: String,
        pub size: String,
        pub price: f64,
        pub details: T,
    }

    impl<T> Clothing<T> {
        pub fn new(name: String, size: String, price: f64, details: T) -> Self {
            Clothing {
                name,
                size,
                price,
                details,
            }
        }
    }
}

fn main() {
    // Contoh penggunaan barang elektronik
    let electronic = electronics::Electronic::new(
        String::from("Smartphone"),
        String::from("Brand XYZ"),
        699.99,
        String::from("8GB RAM, 128GB Storage"),
    );

    // Contoh penggunaan pakaian
    let clothing = clothing::Clothing::new(
        String::from("T-shirt"),
        String::from("M"),
        19.99,
        String::from("100% Cotton"),
    );

    println!(
        "Electronic: {} by {} - Price: ${:.2} - Specification: {}",
        electronic.name, electronic.brand, electronic.price, electronic.specification
    );

    println!(
        "Clothing: {} (Size: {}) - Price: ${:.2} - Details: {}",
        clothing.name, clothing.size, clothing.price, clothing.details
    );
}
