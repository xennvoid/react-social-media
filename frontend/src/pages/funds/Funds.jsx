import React from 'react';
import styles from './funds.module.scss';

const Funds = () => {

    const funds = [
        {
            name: "Turn back alive",
            paymentLink: "https://savelife.in.ua/donate/#donate-army-card-monthly",
            description: "“Turn back alive” is the largest organization in Ukraine to help the military. Since 2014, we have accumulated 6 billion hryvnias for the war and continue to competently spend on the war. The Fund implements projects that help the lives of our defenders and help them to protect the Ukrainian land.",
            category: "Assistance to the armed forces of Ukraine",
            location: "Ukraine",
            rating: 5.0,
            imageUrl: "https://www.econlib.org/wp-content/uploads/2018/02/Charity-scaled.jpeg"

        },
        {
            name: "American Red Cross",
            paymentLink: "https://www.redcross.org/donate",
            description: "Preventing and alleviating human suffering in the face of emergencies by mobilizing the power of volunteers and the generosity of donors.",
            category: "International aid",
            location: "Global",
            rating: 3.7,
            imageUrl: "https://www.econlib.org/wp-content/uploads/2018/02/Charity-scaled.jpeg"
        },
        {
            name: "UNICEF",
            paymentLink: "https://www.unicef.org/donate",
            description: "Protecting the rights of every child worldwide.",
            category: "Child welfare",
            location: "Global",
            rating: 4.4,
            imageUrl: "https://www.econlib.org/wp-content/uploads/2018/02/Charity-scaled.jpeg"
        },
        {
            name: "Doctors Without Borders",
            paymentLink: "https://donate.doctorswithoutborders.org/onetime.cfm",
            description: "Providing medical assistance to people affected by conflict, epidemics, disasters, or exclusion from health care.",
            category: "International aid",
            location: "Global",
            rating: 4.3,
            imageUrl: "https://www.econlib.org/wp-content/uploads/2018/02/Charity-scaled.jpeg"
        },
        {
            name: "Save the Children",
            paymentLink: "https://www.savethechildren.org/us/ways-to-help/donate",
            description: "Improving the lives of children in need in the United States and around the world.",
            category: "Child welfare",
            location: "Global",
            rating: 4.2,
            imageUrl: "https://www.econlib.org/wp-content/uploads/2018/02/Charity-scaled.jpeg"
        },
        {
            name: "World Wildlife Fund",
            paymentLink: "https://www.worldwildlife.org/",
            description: "Conserving nature and reducing the most pressing threats to the diversity of life on Earth.",
            category: "Environmental",
            location: "Global",
            rating: 3.9,
            imageUrl: "https://www.econlib.org/wp-content/uploads/2018/02/Charity-scaled.jpeg"
        },
        {
            name: "Feeding America",
            paymentLink: "https://www.feedingamerica.org/donate",
            description: "Fighting hunger and providing food assistance to those in need in the United States.",
            category: "Hunger relief",
            location: "United States",
            rating: 4.5,
            imageUrl: "https://www.econlib.org/wp-content/uploads/2018/02/Charity-scaled.jpeg"
        },
        {
            name: "Habitat for Humanity",
            paymentLink: "https://www.habitat.org/donate/",
            description: "Building and repairing homes to address the global housing crisis.",
            category: "Housing",
            location: "Global",
            rating: 4.1,
            imageUrl: "https://www.econlib.org/wp-content/uploads/2018/02/Charity-scaled.jpeg"
        },
        {
            name: "St. Jude Children's Research Hospital",
            paymentLink: "https://www.stjude.org/donate/donate-to-st-jude.html",
            description: "Leading the way the world understands, treats and defeats childhood cancer and other life-threatening diseases.",
            category: "Medical research",
            location: "United States",
            rating: 4.6,
            imageUrl: "https://www.econlib.org/wp-content/uploads/2018/02/Charity-scaled.jpeg"
        },
        {
            name: "Oxfam",
            paymentLink: "https://www.oxfam.org/donate",
            description: "Fighting global poverty and injustice by working directly with communities and advocating for policy changes.",
            category: "International aid",
            location: "Global",
            rating: 3.8,
            imageUrl: "https://www.econlib.org/wp-content/uploads/2018/02/Charity-scaled.jpeg"
        },
        {
            name: "Water.org",
            paymentLink: "https://water.org/donate/",
            description: "Providing access to safe water and sanitation to those in need around the world.",
            category: "Water and sanitation",
            location: "Global",
            rating: 4.2,
            imageUrl: "https://www.econlib.org/wp-content/uploads/2018/02/Charity-scaled.jpeg"
        },
        {
            name: "Charity: Water",
            paymentLink: "https://donate.charitywater.org/donate/main",
            description: "Bringing clean and safe drinking water to people in need around the world.",
            category: "Water and Sanitation",
            location: "Global",
            rating: 4.6,
            imageUrl: "https://www.econlib.org/wp-content/uploads/2018/02/Charity-scaled.jpeg"
        },
        {
            name: "The Nature Conservancy",
            paymentLink: "https://preserve.nature.org/page/80429/donate/1",
            description: "Protecting the lands and waters on which all life depends.",
            category: "Environmental Conservation",
            location: "Global",
            rating: 4.1,
            imageUrl: "https://www.econlib.org/wp-content/uploads/2018/02/Charity-scaled.jpeg"
        },
    ];


    return (
        <div className={styles.container}>
            {funds.map((fund, index) => (
                <div key={index} className={styles.fund}>
                    <div className={styles.image} style={{ backgroundImage: `url(${fund.imageUrl})` }}></div>
                    <div className={styles.details}>
                        <h3>{fund.name}</h3>
                        <p>{fund.description}</p>
                        <p><strong>Category:</strong> {fund.category}</p>
                        <p><strong>Location:</strong> {fund.location}</p>
                        <p><strong>Rating:</strong> {fund.rating}</p>
                        <a href={fund.paymentLink} target="_blank" className={styles.button}>Donate</a>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Funds;