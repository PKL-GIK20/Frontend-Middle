use std::sync::{Mutex, Arc};
use std::thread;
use std::sync::mpsc;

fn main() {
    // Contoh penggunaan Mutex
    let data = Arc::new(Mutex::new(0));

    let handles: Vec<_> = (0..10).map(|_| {
        let data = data.clone();
        thread::spawn(move || {
            let mut data = data.lock().unwrap();
            *data += 1;
        })
    }).collect();

    for handle in handles {
        handle.join().unwrap();
    }

    println!("Data: {:?}", *data.lock().unwrap());

    // Contoh penggunaan Channels
    let (sender, receiver) = mpsc::channel();

    thread::spawn(move || {
        let result = do_some_calculation();
        sender.send(result).unwrap();
    });

    let received = receiver.recv().unwrap();
    println!("Received: {}", received);
}

fn do_some_calculation() -> i32 {
    // Simulasikan perhitungan yang membutuhkan waktu
    thread::sleep(std::time::Duration::from_secs(2));
    42
}
