const tailwindcss = require('tailwindcss');

module.exports = {
    plugins: [
        tailwindcss('./tailwind.js'),
        require('autoprefixer')
    ],
    theme: {
        extend: {
            keyframes: {
                wiggle: {
                    '0%': { transform: 'translateY(-100%)' },
                    '100%': { transform: 'translateY(0)' },
                }
            },
            animation: {
                'wiggle': 'wiggle 1s ease',
            }
        }
    }
    // theme: {
    //     extend: {
    //       animation: {
    //           wiggle: 'wiggle 1s ease-in-out infinite',
    //       }
    //     }
    //   }
};

// module.exports = {

// };
// module.exports = {

// }