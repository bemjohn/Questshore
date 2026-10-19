export const groupExcursionsFallback = {
  heroBackgroundImage:
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1920&q=80",
  groupExperiences: [
    {
      order: "01",
      title: "Family Groups",
      description:
        "Create unforgettable memories with the people who matter most. Whether you’re planning a family reunion, celebrating a birthday or anniversary, or simply enjoying a cruise together, we’ll design an itinerary that caters to all ages and interests. From relaxing beach escapes to cultural sightseeing and exciting adventures, our experiences ensure everyone—from children to grandparents—has an incredible day ashore.",
      imageUrl:
        "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=800&auto=format&fit=crop",
      alt: "Family group enjoying time together on vacation",
      reversed: false,
    },
    {
      order: "02",
      title: "Corporate Groups",
      description:
        "Strengthen relationships and inspire your team with professionally organized shore excursions. Whether you’re hosting clients, rewarding employees, or planning a company retreat, we create experiences that balance leisure, networking, and team building. We take care of the planning and logistics so your group can focus on enjoying the destination.",
      imageUrl:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop",
      alt: "Corporate team collaborating together",
      reversed: true,
    },
    {
      order: "03",
      title: "Community & Social Groups",
      description:
        "Travel is even more meaningful when shared with like-minded people. We love working with community groups of all kinds, including solo travel communities, singles groups, mums’ groups, alumni associations, church groups, hobby clubs, Lgbtq+, wellness retreats, sports teams, and social organizations. Whether your goal is relaxation, adventure, cultural discovery, or simply spending quality time together, we’ll create an experience that reflects your group’s interests and brings everyone together.",
      imageUrl:
        "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800&auto=format&fit=crop",
      alt: "Community group of friends socializing together",
      reversed: false,
    },
    {
      order: "04",
      title: "Friends & Private Groups",
      description:
        "Whether it’s a birthday celebration, bachelor or bachelorette getaway, graduation trip, or just a chance to reconnect with friends, we’ll help you make the most of your time ashore. Enjoy a personalized itinerary, flexible scheduling, and memorable experiences designed exclusively for your group, without the crowds or rigid schedules of large tour operators.",
      imageUrl:
        "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=800&auto=format&fit=crop",
      alt: "Friends celebrating together on a private getaway",
      reversed: true,
    },
  ],
  groupExpectations: [
    {
      title: "Dedicated Tour Guide",
      description: "Personal guidance throughout your excursion.",
      iconKey: "guide",
    },
    {
      title: "Back-to-Ship Guarantee",
      description:
        "We return your group back to your cruise ship/port on time with extra time to spare.",
      iconKey: "shield",
    },
    {
      title: "Fully Customized Itinerary",
      description: "Tailored excursions to your group interests and preferences.",
      iconKey: "sliders",
    },
    {
      title: "A Group Perk — Your Group Coordinator Explores At No Cost",
      description:
        "Bring a group of 20 or more and your group coordinator enjoys the excursion at no cost.",
      iconKey: "gift",
    },
    {
      title: "Dedicated Group Specialist",
      description:
        "Expert QuestAshore support team member assigned to your group from planning stage, during adventures, and after your cruise.",
      iconKey: "headset",
    },
    {
      title: "Optional Add-ons",
      description: "Scenic photo stops, professional photographers for your group.",
      iconKey: "camera",
    },
  ],
};

export type GroupExcursionsContent = typeof groupExcursionsFallback;
