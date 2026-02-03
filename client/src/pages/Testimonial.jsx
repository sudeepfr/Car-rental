import {React,useRef, useState} from 'react'
import { assets } from '../assets/assets';

const Testimonial = () => {
    const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, text: '' });
    const cardRefs = useRef([]);

    const handleMouseMove = (e, index) => {
        const bounds = cardRefs.current[index].getBoundingClientRect();
        setTooltip({
            visible: true,
            x: e.clientX - bounds.left,
            y: e.clientY - bounds.top,
            text: testimonials[index].name,
        });
    };

    const handleMouseLeave = () => {
        setTooltip({ ...tooltip, visible: false });
    };

    const testimonials = [
        {
            name: 'John Doe',
            title: 'Happy Customer',
            message:
                'Exceptional service and attention to details.everything was handled professionally and attention to  details .Everything was handled professionally ans effeciently from start to finish.highly recommended',
            image: assets.testimonial_image_1,
        },
        {
            name: 'Jane Smith',
            title: 'Happy Customer',
            message:
                'Exceptional service and attention to details.everything was handled professionally and attention to  details .Everything was handled professionally ans effeciently from start to finish.highly recommended',
            image: assets.testimonial_image_2,
        },
        {
            name: 'Bonnie Green',
            title: 'Happy Customer',
            message:
                'Exceptional service and attention to details.everything was handled professionally and attention to  details .Everything was handled professionally ans effeciently from start to finish.highly recommended',
            image: assets.testimonial_image_1,
        },
    ];

    return (
        <div className='mt-50'>
            <h1 className="text-center text-4xl font-bold text-gray-900">What Our Customers Say</h1>
            <p className="text-center text-gray-500 mt-1">
                Discover why discerning travelers choose stayVenture for their luxury accommodations around the world 
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 py-16">
                {testimonials.map((testimonial, index) => (
                    <div key={index} ref={(el) => (cardRefs.current[index] = el)}
                        onMouseMove={(e) => handleMouseMove(e, index)}
                        onMouseLeave={handleMouseLeave}
                        className="relative border border-gray-200 rounded-lg overflow-hidden max-w-sm hover:shadow-lg transition-shadow duration-300"
                    >
                        {tooltip.visible && tooltip.text === testimonial.name && (
                            <span className="absolute px-2.5 py-1 text-sm rounded text-nowrap bg-indigo-500 text-white pointer-events-none transition-all duration-300"
                                style={{ top: tooltip.y + 8, left: tooltip.x + 8, transition: 'all 0.3s ease-out', animationDelay: '0.2s', }} >
                                {tooltip.text}
                            </span>
                        )}

                        <div className="flex flex-col items-center justify-center p-8 text-center">
                            <div className="mb-4 text-gray-500">
                                <h3 className="text-lg font-semibold text-gray-900">Very easy to integrate</h3>
                                <p className="my-4 text-sm line-clamp-3">{testimonial.message}</p>
                            </div>
                            <div className="flex items-center justify-center">
                                <img className="rounded-full w-9 h-9"
                                    src={testimonial.image}
                                    alt={`${testimonial.name} profile`}
                                />
                                <div className="space-y-0.5 font-medium text-left ml-3">
                                    <p>{testimonial.name}</p>
                                    <p className="text-sm text-gray-500">{testimonial.title}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Testimonial;