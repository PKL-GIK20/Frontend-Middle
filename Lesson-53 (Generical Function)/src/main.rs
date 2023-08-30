use std::fmt::Debug;

// Definition of the Item structure
struct Item<T> {
    id: u32,
    name: String,
    quantity: T,
}

// Implementation of the generic function to display item information
fn display_item_info<T: Debug>(item: &Item<T>) {
    println!("ID: {}", item.id);
    println!("Name: {}", item.name);
    println!("Quantity: {:?}", item.quantity);
    println!("---------------------");
}

fn main() {
    let item1 = Item {
        id: 1,
        name: String::from("Pencil"),
        quantity: 50,
    };

    let item2 = Item {
        id: 2,
        name: String::from("Notebook"),
        quantity: 20,
    };

    let item3 = Item {
        id: 3,
        name: String::from("Eraser"),
        quantity: 30,
    };

    display_item_info(&item1);
    display_item_info(&item2);
    display_item_info(&item3);
}
