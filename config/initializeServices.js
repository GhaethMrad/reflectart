import ServicesModel from "../models/Services.model.js";

const initializeServices = async () => {
    try {
        const count = await ServicesModel.countDocuments();

        if (count === 0) {
            await ServicesModel.create([
                  {
                    _id: "1", 
                    title: 'Service 1', 
                    desc: 'Description 1', 
                    image: 'default1.jpg', 
                  },
                  {
                    _id: "2",
                    title: 'Service 2', 
                    desc: 'Description 2', 
                    image: 'default2.jpg', 
                  },
                  { 
                    _id: "3",
                    title: 'Service 3', 
                    desc: 'Description 3', 
                    image: 'default3.jpg', 
                  },
                  { 
                    _id: "4",
                    title: 'Service 4', 
                    desc: 'Description 4', 
                    image: 'default3.jpg', 
                  },
                  { 
                    _id: "5",
                    title: 'Service 5', 
                    desc: 'Description 5', 
                    image: 'default3.jpg', 
                  },
                  { 
                    _id: "6",
                    title: 'Service 6', 
                    desc: 'Description 6', 
                    image: 'default3.jpg', 
                  },
                  { 
                    _id: "7",
                    title: 'Service 7', 
                    desc: 'Description 7', 
                    image: 'default3.jpg', 
                  },
                  { 
                    _id: "8",
                    title: 'Service 8', 
                    desc: 'Description 8', 
                    image: 'default3.jpg', 
                  },
            ])
        }
        console.log('✅ Initial services created successfully');
    } catch(error) {
        console.error('❌ Error initializing services:', error.message);
        process.exit(1)
    }
}

export default initializeServices;