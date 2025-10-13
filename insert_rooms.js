
createTableAndInsertData();

// Function to create table if not exists and insert data
function createTableAndInsertData() {
    const createTableSQL = `
        CREATE TABLE IF NOT EXISTS rooms (
            id INT AUTO_INCREMENT PRIMARY KEY,
            roomId VARCHAR(20) NOT NULL,
            type VARCHAR(50),
            priceZAR INT,
            available TINYINT(1),
            rating INT,
            thumbnail VARCHAR(255),
            images JSON
        )
    `;
    db.query(createTableSQL, (err) => {
        if (err) {
            console.error('Error creating table:', err);
            return;
        }
        console.log('Table "rooms" is ready.');
        insertData();
    });
}

// Function to insert data from JSON
function insertData() {
    const filePath = path.join(__dirname, 'syndicate_hotel_real_images.json');
    const rawData = fs.readFileSync(filePath, 'utf-8');
    const hotelData = JSON.parse(rawData);

    const rooms = hotelData.hotel.rooms;

    rooms.forEach(room => {
        const insertSQL = `
            INSERT INTO rooms (roomId, type, priceZAR, available, rating, thumbnail, images)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const params = [
            room.roomId,
            room.type,
            room.priceZAR,
            room.available,
            room.rating,
            room.thumbnail,
            JSON.stringify(room.images)
        ];

        db.query(insertSQL, params, (err) => {
            if (err) {
                console.error(`Error inserting room ${room.roomId}:`, err);
            } else {
                console.log(`Room ${room.roomId} inserted successfully.`);
            }
        });
    });
}
