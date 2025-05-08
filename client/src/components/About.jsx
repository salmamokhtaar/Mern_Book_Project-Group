
import React from 'react';
import { motion } from 'framer-motion';
import { FaBookReader, FaStore, FaHistory, FaUsers, FaAward, FaBookOpen } from 'react-icons/fa';
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker, HiOutlineClock } from 'react-icons/hi';

const About = () => {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const teamMembers = [
    {
      name: "Sagal Ahmed",
      role: "Founder & CEO",
      image: "https://images.pexels.com/photos/20518457/pexels-photo-20518457/free-photo-of-brunette-in-red-blouse.jpeg?auto=compress&cs=tinysrgb&w=600",
      bio: "Passionate about making literature accessible to everyone."
    },
    {
      name: "Salma Omar",
      role: "Chief Operating Officer",
      image: "https://images.pexels.com/photos/20516159/pexels-photo-20516159/free-photo-of-portrait-of-a-girl-glancing-in-a-leather-jacket.jpeg?auto=compress&cs=tinysrgb&w=600",
      bio: "Oversees day-to-day operations with a focus on customer experience."
    },
    {
      name: "Nimco Hassan",
      role: "Head of Content",
      image: "https://images.pexels.com/photos/20516157/pexels-photo-20516157/free-photo-of-portrait-of-a-girl-in-a-leather-jacket.jpeg?auto=compress&cs=tinysrgb&w=600",
      bio: "Curates our book collection with an eye for diverse perspectives."
    },
    {
      name: "Hamdi Ali",
      role: "Technical Director",
      image: "https://images.pexels.com/photos/20449223/pexels-photo-20449223/free-photo-of-face-of-smiling-teenager.jpeg?auto=compress&cs=tinysrgb&w=600",
      bio: "Ensures our digital platforms provide a seamless reading experience."
    },
    {
      name: "Hafsa Mohamed",
      role: "Marketing Manager",
      image: "https://images.pexels.com/photos/20518959/pexels-photo-20518959/free-photo-of-young-brunette-posing-against-a-beige-drape.jpeg?auto=compress&cs=tinysrgb&w=600",
      bio: "Creates engaging campaigns to connect readers with their next favorite book."
    }
  ];

  return (
    <div className="bg-neutral-50 pt-28 pb-16">
      {/* Hero Section */}
      <section className="relative bg-primary-color text-white py-20 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl"></div>
          <div className="absolute top-96 -right-20 w-96 h-96 bg-secondary-light rounded-full mix-blend-overlay filter blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 lg:px-24 relative z-10">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About BookHaven</h1>
            <p className="text-xl mb-8">
              Discover our story, mission, and the passionate team behind BookHaven.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary-light/20 rounded-lg"></div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-secondary-light/20 rounded-lg"></div>
                <img
                  src="https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Bookstore interior"
                  className="rounded-lg shadow-lg relative z-10 w-full h-auto"
                />
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <div className="flex items-center mb-4">
                <FaHistory className="text-primary-color text-2xl mr-3" />
                <h2 className="text-3xl font-bold text-neutral-800">Our Story</h2>
              </div>
              <p className="text-neutral-700 mb-4 leading-relaxed">
                Founded in 2020, BookHaven began with a simple mission: to create a space where book lovers could discover, access, and enjoy quality literature without barriers.
              </p>
              <p className="text-neutral-700 mb-4 leading-relaxed">
                What started as a small online collection has grown into a comprehensive digital library, serving thousands of readers worldwide. Our journey has been guided by our love for books and the belief that stories have the power to educate, inspire, and transform lives.
              </p>
              <p className="text-neutral-700 leading-relaxed">
                Today, we continue to expand our collection while maintaining our commitment to quality, diversity, and accessibility. Every book in our catalog is carefully selected to ensure our readers have access to the best literature across all genres.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4 lg:px-24">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <div className="flex items-center justify-center mb-4">
              <FaBookReader className="text-primary-color text-2xl mr-3" />
              <h2 className="text-3xl font-bold text-neutral-800">Our Mission</h2>
            </div>
            <p className="text-neutral-700 leading-relaxed">
              At BookHaven, we're dedicated to making quality literature accessible to everyone, everywhere. We believe that books have the power to educate, inspire, and transform lives.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div
              className="bg-white p-6 rounded-lg shadow-md border border-neutral-200"
              variants={fadeIn}
            >
              <div className="bg-primary-color/10 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                <FaBookOpen className="text-primary-color text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-neutral-800 mb-3 text-center">Accessibility</h3>
              <p className="text-neutral-700 text-center">
                Making quality literature available to readers of all backgrounds and circumstances.
              </p>
            </motion.div>

            <motion.div
              className="bg-white p-6 rounded-lg shadow-md border border-neutral-200"
              variants={fadeIn}
            >
              <div className="bg-primary-color/10 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                <FaUsers className="text-primary-color text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-neutral-800 mb-3 text-center">Diversity</h3>
              <p className="text-neutral-700 text-center">
                Curating a collection that represents diverse voices, perspectives, and experiences.
              </p>
            </motion.div>

            <motion.div
              className="bg-white p-6 rounded-lg shadow-md border border-neutral-200"
              variants={fadeIn}
            >
              <div className="bg-primary-color/10 w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto">
                <FaAward className="text-primary-color text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-neutral-800 mb-3 text-center">Quality</h3>
              <p className="text-neutral-700 text-center">
                Ensuring every book in our collection meets high standards of literary excellence.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-24">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <div className="flex items-center justify-center mb-4">
              <FaUsers className="text-primary-color text-2xl mr-3" />
              <h2 className="text-3xl font-bold text-neutral-800">Meet Our Team</h2>
            </div>
            <p className="text-neutral-700 leading-relaxed">
              The passionate individuals behind BookHaven, dedicated to bringing the best reading experience to our community.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-md border border-neutral-200 transition-transform duration-300 hover:-translate-y-2"
                variants={fadeIn}
              >
                <div className="h-64 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-neutral-800 mb-1">{member.name}</h3>
                  <p className="text-primary-color font-medium mb-3">{member.role}</p>
                  <p className="text-neutral-700">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Visit Us Section */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4 lg:px-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <div className="flex items-center mb-4">
                <FaStore className="text-primary-color text-2xl mr-3" />
                <h2 className="text-3xl font-bold text-neutral-800">Visit Our Store</h2>
              </div>
              <p className="text-neutral-700 mb-6 leading-relaxed">
                While we're primarily a digital platform, we also maintain a physical bookstore where you can browse our collection, attend events, and connect with fellow book lovers.
              </p>

              <div className="space-y-4">
                <div className="flex items-start">
                  <HiOutlineLocationMarker className="text-primary-color text-xl mt-1 mr-3" />
                  <div>
                    <h3 className="font-bold text-neutral-800">Address</h3>
                    <p className="text-neutral-700">123 Book Street, Reading Avenue, Libraryville</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <HiOutlineClock className="text-primary-color text-xl mt-1 mr-3" />
                  <div>
                    <h3 className="font-bold text-neutral-800">Hours</h3>
                    <p className="text-neutral-700">Monday - Friday: 9am - 8pm</p>
                    <p className="text-neutral-700">Saturday - Sunday: 10am - 6pm</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <HiOutlinePhone className="text-primary-color text-xl mt-1 mr-3" />
                  <div>
                    <h3 className="font-bold text-neutral-800">Phone</h3>
                    <p className="text-neutral-700">+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <HiOutlineMail className="text-primary-color text-xl mt-1 mr-3" />
                  <div>
                    <h3 className="font-bold text-neutral-800">Email</h3>
                    <p className="text-neutral-700">contact@bookhaven.com</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <div className="relative">
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-secondary-light/20 rounded-lg"></div>
                <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-primary-light/20 rounded-lg"></div>
                <img
                  src="https://images.pexels.com/photos/3747468/pexels-photo-3747468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Bookstore interior"
                  className="rounded-lg shadow-lg relative z-10 w-full h-auto"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary-color text-white">
        <div className="container mx-auto px-4 lg:px-24 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl font-bold mb-6">Join Our Community of Book Lovers</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Discover new books, connect with fellow readers, and embark on countless literary adventures with BookHaven.
            </p>
            <button className="bg-white text-primary-color hover:bg-neutral-100 font-bold py-3 px-8 rounded-lg transition-colors">
              Explore Our Collection
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;