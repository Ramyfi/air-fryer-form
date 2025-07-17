import React, { useState, useCallback, useEffect } from 'react';
import { loadSlim} from "@tsparticles/slim";
import Particles, {initParticlesEngine} from "@tsparticles/react";   
import { loadFull } from 'tsparticles';

const AirFryer = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    costGuess: '',
    spidrPin: ''
  });

    const [ init, setInit ] = useState(false);

    // this should be run only once per application lifetime
    useEffect(() => {
        initParticlesEngine(async (engine) => {
            //await loadAll(engine);
            await loadFull(engine);
            // await loadSlim(engine);
            //await loadBasic(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const particlesLoaded = (container) => {
        console.log(container);
    };
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;

    // Format Spidr PIN with dashes
    if (name === 'spidrPin') {
      // Remove all non-digits
      const digits = value.replace(/\D/g, '');
      // Limit to 16 digits
      const limitedDigits = digits.slice(0, 16);
      // Add dashes every 4 digits
      processedValue = limitedDigits.replace(/(\d{4})(?=\d)/g, '$1-');
    }

    // Format phone number
    if (name === 'phone') {
      const digits = value.replace(/\D/g, '');
      const limitedDigits = digits.slice(0, 10);
      if (limitedDigits.length >= 6) {
        processedValue = `(${limitedDigits.slice(0, 3)}) ${limitedDigits.slice(3, 6)}-${limitedDigits.slice(6)}`;
      } else if (limitedDigits.length >= 3) {
        processedValue = `(${limitedDigits.slice(0, 3)}) ${limitedDigits.slice(3)}`;
      } else {
        processedValue = limitedDigits;
      }
    }

    // Format cost guess (add $ and handle decimals)
    if (name === 'costGuess') {
      const numericValue = value.replace(/[^\d.]/g, '');
      if (numericValue) {
        processedValue = `$${numericValue}`;
      } else {
        processedValue = '';
      }
    }

    setFormData(prev => ({
      ...prev,
      [name]: processedValue
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (formData.phone.replace(/\D/g, '').length !== 10) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.costGuess.trim()) {
      newErrors.costGuess = 'Cost guess is required';
    }

    if (!formData.spidrPin.trim()) {
      newErrors.spidrPin = 'Spidr PIN is required';
    } else if (formData.spidrPin.replace(/\D/g, '').length !== 16) {
      newErrors.spidrPin = 'Spidr PIN must be exactly 16 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    
    if (validateForm()) {
      // Print form data to console
      console.log('Form submitted with data:', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        email: formData.email,
        costGuess: formData.costGuess,
        spidrPin: formData.spidrPin
      });
      
      // Show success message
      alert('Thank you for your interest! Your form has been submitted successfully.');
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        costGuess: '',
        spidrPin: ''
      });
    }
  };

  const particlesOptions = {
                background: {
                    color: {
                        value: "#1F1F1F",
                    },
                },
                fpsLimit: 120,
                interactivity: {
                    events: {
                        // onClick: {
                        //     enable: false,
                        //     mode: "push",
                        // },
                        onHover: {
                            enable: true,
                            mode: "bubble",
                        },
                        resize: true,
                    },
                    modes: {
                         bubble: {
        distance: 150,
        duration: 0.4,
        opacity: 1,
        size: 2,
      },
                        push: {
                            quantity: 4,
                        },
                        repulse: {
                            distance: 200,
                            duration: 0.4,
                        },
                    },
                },
                particles: {
                    color: {
                        value: "#ffffff",
                    },
                    links: {
                        color: "#ffffff",
                        distance: 150,
                        enable: true,
                        opacity: 0.5,
                        width: 1,
                    },
                    move: {
                        direction: "none",
                        enable: true,
                        outModes: {
                            default: "bounce",
                        },
                        random: false,
                        speed: 6,
                        straight: false,
                    },
                    number: {
                        density: {
                            enable: true,
                            area: 800,
                        },
                        value: 80,
                    },
                    opacity: {
                        value: 0.5,
                    },
                    shape: {
                        type: "circle",
                    },
                    size: {
                        value: { min: 1, max: 5 },
                    },
                },
                detectRetina: true,
};


  return (


// {/* Particles container */}
<div className='min-h-screen flex items-center justify-center p-4'>
 {init && <Particles
  id="tsparticles"
  loaded={particlesLoaded}
  options={particlesOptions}
  className="fixed inset-0 z-0"
/>}
{/* Form container */}
  <div className="relative w-full max-w-2xl bg-[#479dafe6]/90 backdrop-blur-sm p-8 border border-[#479dafe6]/50 rounded-lg z-10 shadow-2xl">
    {/* Header */}
    <div className="text-center mb-8">
      <h2 className="text-2xl font-bold font-[raleway] text-white mb-2">
        Get Early Access to Our Revolutionary Air Fryer
      </h2>
      <hr className="w-full h-0.5 bg-white border-0 mx-auto mb-4" />
      <p className="text-white font-[raleway]">
        Be the first to experience the future of cooking. Fill out the form below to secure your spot!
      </p>
    </div>

    {/* Form */}
    <div className="space-y-6">
      {/* Name Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium font-[raleway] text-white mb-1">
            First Name <span className="text-red-800 font-bold">*</span>
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30 font-[raleway] transition-colors ${
              errors.firstName ? 'border-red-800' : 'border-white'
            }`}
            placeholder="Enter your first name"
          />
          {errors.firstName && <p className="text-red-800 text-sm mt-1 font-[raleway]">{errors.firstName}</p>}
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium font-[raleway] text-white mb-1">
            Last Name <span className="text-red-800 font-bold">*</span>
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30 font-[raleway] transition-colors ${
              errors.lastName ? 'border-red-800' : 'border-white'
            }`}
            placeholder="Enter your last name"
          />
          {errors.lastName && <p className="text-red-800 text-sm mt-1 font-[raleway]">{errors.lastName}</p>}
        </div>
      </div>

      {/* Contact Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium font-[raleway] text-white mb-1">
            Phone Number <span className="text-red-800 font-bold">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30 font-[raleway] transition-colors ${
              errors.phone ? 'border-red-800' : 'border-white'
            }`}
            placeholder="(555) 123-4567"
          />
          {errors.phone && <p className="text-red-800 text-sm mt-1 font-[raleway]">{errors.phone}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium font-[raleway] text-white mb-1">
            Email Address <span className="text-red-800 font-bold">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30 font-[raleway] transition-colors ${
              errors.email ? 'border-red-800' : 'border-white'
            }`}
            placeholder="you@example.com"
          />
          {errors.email && <p className="text-red-800 text-sm mt-1 font-[raleway]">{errors.email}</p>}
        </div>
      </div>

      {/* Cost Guess */}
      <div>
        <label htmlFor="costGuess" className="block text-sm font-medium font-[raleway] text-white mb-1">
          Guess the Air Fryer's Cost <span className="text-red-800 font-bold">*</span>
        </label>
        <input
          type="text"
          id="costGuess"
          name="costGuess"
          value={formData.costGuess}
          onChange={handleInputChange}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30 font-[raleway] transition-colors ${
            errors.costGuess ? 'border-red-800' : 'border-white'
          }`}
          placeholder="$299.99"
        />
        {errors.costGuess && <p className="text-red-800 text-sm mt-1 font-[raleway]">{errors.costGuess}</p>}
        <p className="text-sm text-yellow-300/75 mt-1">
          Take your best guess at what this revolutionary air fryer will cost!
        </p>
      </div>

      {/* Spidr PIN */}
      <div>
        <label htmlFor="spidrPin" className="block text-sm font-medium font-[raleway] text-white mb-1">
          Very, Very Secret 16-Digit Spidr PIN <span className="text-red-800 font-bold">*</span>
        </label>
        <input
          type="text"
          id="spidrPin"
          name="spidrPin"
          value={formData.spidrPin}
          onChange={handleInputChange}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30 font-[raleway] transition-colors ${
            errors.spidrPin ? 'border-red-800' : 'border-white'
          }`}
          placeholder="1234-5678-9012-3456"
          maxLength="19"
        />
        {errors.spidrPin && <p className="text-red-800 text-sm mt-1 font-[raleway]">{errors.spidrPin}</p>}
        <p className="text-sm text-yellow-300/75 mt-1 font-[raleway]">
          🤫 Don't tell anyone! Enter your top-secret 16-digit Spidr PIN
        </p>
      </div>

      {/* Submit Button */}
      <button
        type="button"
        onClick={handleSubmit}
        className="w-full bg-transparent border-1 font-[raleway] border-white text-white py-4 px-6 rounded-lg
        hover:bg-[#1F1F1F]/50 hover:text-[#479dafe6] hover:border-[#1F1F1F]/25 transition"
      >
        Submit My Interest
      </button>
    </div>

    {/* Footer */}
    <div className="text-center mt-8 text-sm text-[#1F1F1F]/50 font-[raleway]">
      <p>
        By submitting this form, you agree to receive updates about our revolutionary air fryer.
      </p>
      <p className="mt-2 font-[raleway]">
        Powered by Sp<span className="font-semibold text-white/50">i</span>dr Design
      </p>
    </div>
  </div>

</div>



  );
};

export default AirFryer;

