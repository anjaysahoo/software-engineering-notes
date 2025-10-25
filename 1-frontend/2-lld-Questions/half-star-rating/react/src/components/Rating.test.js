import React from 'react'
import {render, cleanup, getAllByTestId, fireEvent, getByTestId} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Rating from "./Rating";


function hoverIn(ratingIcons, hoverIndex, options) {
    fireEvent.mouseMove(ratingIcons[hoverIndex], options);
    fireEvent.mouseOver(ratingIcons[hoverIndex], options);
    fireEvent.mouseEnter(ratingIcons[hoverIndex], options);
}

function hoverOut(ratingIcons, hoverIndex) {
    fireEvent.mouseOut(ratingIcons[hoverIndex]);
    fireEvent.mouseLeave(ratingIcons[hoverIndex]);
}

describe('Rating Component', () => {
    const TEST_IDS = {
        starRatingContainer: 'star-rating-container',
        ratingIcon: 'rating-icon'
    };

    const ICONS = {
        STARS: {
            filled: '/icons/stars/filled.svg',
            empty: '/icons/stars/empty.svg',
            half: '/icons/stars/half.svg'
        },
        SMILEYS: {
            filled: '/icons/smileys/filled.svg',
            empty: '/icons/smileys/empty.svg',
            half: '/icons/smileys/half.svg'
        }
    }

    beforeEach(() => {

    });

    afterEach(() => {
        cleanup()
    });

    describe('Initial Setup', () => {
        test('should render the stars correctly on init', () => {
            const {getAllByTestId} = render(<Rating/>)
            const ratingIcons = getAllByTestId(TEST_IDS.ratingIcon);

            ratingIcons.forEach(icon => {
                expect(icon.src).toContain(ICONS.STARS.empty);
            })
        })
    })


    describe('Hovering Star', () => {
        test('should fill all the stars upto the hover index on hover', () => {
            const {getAllByTestId} = render(<Rating/>)
            const ratingIcons = getAllByTestId(TEST_IDS.ratingIcon);
            const hoverIndex = 2;
            hoverIn(ratingIcons, hoverIndex);

            ratingIcons.forEach((icon, index) => {
                if (index > hoverIndex) {
                    expect(icon.src).toContain(ICONS.STARS.empty);
                } else {
                    expect(icon.src).toContain(ICONS.STARS.filled);
                }
            })
        })

        test('should revert back when the mouse is moved away from the star', () => {
            const {getAllByTestId} = render(<Rating/>)
            const ratingIcons = getAllByTestId(TEST_IDS.ratingIcon);
            const hoverIndex = 1;

            hoverIn(ratingIcons, hoverIndex);

            ratingIcons.forEach((icon, index) => {
                if (index > hoverIndex) {
                    expect(icon.src).toContain(ICONS.STARS.empty);
                } else {
                    expect(icon.src).toContain(ICONS.STARS.filled);
                }
            })

            hoverOut(ratingIcons, hoverIndex);

            ratingIcons.forEach((icon, index) => {
                expect(icon.src).toContain(ICONS.STARS.empty);
            })
        })
    })


    describe('Persist State on Click', () => {
        test('should persist the rating on clicking on a icon', () => {
            const {getAllByTestId} = render(<Rating/>)
            const ratingIcons = getAllByTestId(TEST_IDS.ratingIcon);

            const clickIndex = 2;

            fireEvent.click(ratingIcons[clickIndex]);

            ratingIcons.forEach((icon, index) => {
                if (index <= clickIndex) {
                    expect(icon.src).toContain(ICONS.STARS.filled);
                } else {
                    expect(icon.src).toContain(ICONS.STARS.empty);
                }
            })
        })

        test('should reset the value when clicking on a icon again', () => {
            const {getAllByTestId} = render(<Rating/>)
            const ratingIcons = getAllByTestId(TEST_IDS.ratingIcon);

            const clickIndex = 4;

            ratingIcons.forEach((icon, index) => {
                expect(icon.src).toContain(ICONS.STARS.empty);
            })

            fireEvent.click(ratingIcons[clickIndex]);

            ratingIcons.forEach((icon, index) => {
                expect(icon.src).toContain(ICONS.STARS.filled);
            })

            fireEvent.click(ratingIcons[clickIndex]);

            ratingIcons.forEach((icon, index) => {
                expect(icon.src).toContain(ICONS.STARS.empty);
            })
        })
    })


    describe('Custom Icons', () => {
        test('should accept a custom svg icon set and implement it correctly', () => {
            const {getAllByTestId} = render(
                <Rating
                    halfFilledIcon={ICONS.SMILEYS.half}
                    filledIcon={ICONS.SMILEYS.filled}
                    emptyIcon={ICONS.SMILEYS.empty}
                />
            );
            const ratingIcons = getAllByTestId(TEST_IDS.ratingIcon);
            const clickIndex = 2;

            ratingIcons.forEach((icon) => {
                expect(icon.src).toContain(ICONS.SMILEYS.empty);
            });

            fireEvent.click(ratingIcons[clickIndex]);

            ratingIcons.forEach((icon, index) => {
                if (index <= clickIndex) {
                    expect(icon.src).toContain(ICONS.SMILEYS.filled);
                } else {
                    expect(icon.src).toContain(ICONS.SMILEYS.empty);
                }
            });
        })

    })

    describe('Optimistic Toggle', () => {

        function validateIconState(ratingIcons, value) {
            ratingIcons.forEach((icon, index) => {
                if (index < value) {
                    expect(icon.src).toContain(ICONS.STARS.filled);
                } else {
                    expect(icon.src).toContain(ICONS.STARS.empty);
                }
            });
        }

        test('should set the initial value for the component based on the prop value passed', () => {
            const value = 3
            const {getAllByTestId} = render(
                <Rating
                    value={value}
                />
            );
            const ratingIcons = getAllByTestId(TEST_IDS.ratingIcon);

            validateIconState(ratingIcons, value);
        })

        test('should update the value of the rating if the prop value changes', () => {
            let value = 3
            const {getAllByTestId, rerender} = render(<Rating value={value}/>);
            const ratingIcons = getAllByTestId(TEST_IDS.ratingIcon);

            validateIconState(ratingIcons, value);

            value = 1;
            rerender(<Rating value={value}/>)
            validateIconState(ratingIcons, value);

            value = 3;
            rerender(<Rating value={value}/>)
            validateIconState(ratingIcons, value);

        });
    })

    describe('Half Ratings', () => {
        test('should accept half ratings when prop steps is passed as 0.5', () => {
            const value = 2.5;
            const {getAllByTestId} = render(<Rating steps={0.5} value={value}/>);
            const ratingIcons = getAllByTestId(TEST_IDS.ratingIcon);

            ratingIcons.forEach((icon, index) => {
                if (index === value - 0.5) {
                    expect(icon.src).toContain(ICONS.STARS.half);
                } else if (index > value) {
                    expect(icon.src).toContain(ICONS.STARS.empty);
                } else {
                    expect(icon.src).toContain(ICONS.STARS.filled);
                }
            })
        })

        function addMockPosition(element, left, right) {
            let width = 100;
            let height = 100;
            element.getBoundingClientRect = jest.fn(() => ({
                top: 315.5,
                bottom: 402.5,
                height,
                width,
                left,
                right,
                x: left,
                y: 302.5,
            }));
        }

        test('should implement hover in on left side for half ratings', () => {
            const {getAllByTestId} = render(<Rating steps={0.5}/>);
            const ratingIcons = getAllByTestId(TEST_IDS.ratingIcon);
            const hoverIndex = 2;

            const options = {
                clientX: 880,
                bubbles: true,
                cancelable: true,
            };

            addMockPosition(ratingIcons[hoverIndex], 846, 946);

            hoverIn(ratingIcons, hoverIndex, options)

            ratingIcons.forEach((icon, index) => {
                if (index > hoverIndex) {
                    expect(icon.src).toContain(ICONS.STARS.empty);
                } else if (index === hoverIndex) {
                    expect(icon.src).toContain(ICONS.STARS.half);
                } else {
                    expect(icon.src).toContain(ICONS.STARS.filled);
                }
            })
        })


        test('should implement hover in on right side for half ratings', () => {
            const {getAllByTestId} = render(<Rating steps={0.5}/>);
            const ratingIcons = getAllByTestId(TEST_IDS.ratingIcon);
            const hoverIndex = 3;

            const options = {
                clientX: 1020,
                bubbles: true,
                cancelable: true,
            };

            addMockPosition(ratingIcons[hoverIndex], 946, 1046);

            hoverIn(ratingIcons, hoverIndex, options)

            ratingIcons.forEach((icon, index) => {
                if (index > hoverIndex) {
                    expect(icon.src).toContain(ICONS.STARS.empty);
                } else {
                    expect(icon.src).toContain(ICONS.STARS.filled);
                }
            })
        })

        test('should implement hover out for half ratings', () => {
            const {getAllByTestId} = render(<Rating steps={0.5}/>);
            const ratingIcons = getAllByTestId(TEST_IDS.ratingIcon);
            const hoverIndex = 4;

            ratingIcons.forEach((icon, index) => {
                expect(icon.src).toContain(ICONS.STARS.empty);
            })

            hoverIn(ratingIcons, hoverIndex);

            ratingIcons.forEach((icon, index) => {
                if (index > hoverIndex) {
                    expect(icon.src).toContain(ICONS.STARS.empty);
                } else if (index === hoverIndex) {
                    expect(icon.src).toContain(ICONS.STARS.half);
                } else {
                    expect(icon.src).toContain(ICONS.STARS.filled);
                }
            })

            hoverOut(ratingIcons, hoverIndex);

            ratingIcons.forEach((icon, index) => {
                expect(icon.src).toContain(ICONS.STARS.empty);
            })
        })

        test('should persist half ratings on click', () => {
            const {getAllByTestId} = render(<Rating steps={0.5}/>);
            const ratingIcons = getAllByTestId(TEST_IDS.ratingIcon);
            const clickIndex = 3;

            const options = {
                clientX: 974,
                bubbles: true,
                cancelable: true,
            };

            addMockPosition(ratingIcons[clickIndex], 946, 1046);

            fireEvent.click(ratingIcons[clickIndex], options)

            ratingIcons.forEach((icon, index) => {
                if (index > clickIndex) {
                    expect(icon.src).toContain(ICONS.STARS.empty);
                } else if (index === clickIndex) {
                    expect(icon.src).toContain(ICONS.STARS.half);
                } else {
                    expect(icon.src).toContain(ICONS.STARS.filled);
                }
            })
        })
    })


    describe('Accessibility', () => {
        const fireKey = (container, key, keyCode) => {
            fireEvent.keyDown(container, {
                key: key,
                code: key,
                keyCode: keyCode,
                charCode: keyCode
            });
        }
        test('should increase the value when right arrow is clicked', () => {
            const {getAllByTestId, getByTestId} = render(<Rating/>)
            const starRatingContainer = getByTestId(TEST_IDS.starRatingContainer);
            const ratingIcons = getAllByTestId(TEST_IDS.ratingIcon);

            ratingIcons.forEach((icon, index) => {
                expect(icon.src).toContain(ICONS.STARS.empty);
            })

            fireKey(starRatingContainer, 'ArrowRight', 39)

            expect(ratingIcons[0].src).toContain(ICONS.STARS.filled);
            expect(ratingIcons[1].src).toContain(ICONS.STARS.empty);

            fireKey(starRatingContainer, 'ArrowRight', 39)
            fireKey(starRatingContainer, 'ArrowRight', 39)

            expect(ratingIcons[0].src).toContain(ICONS.STARS.filled);
            expect(ratingIcons[1].src).toContain(ICONS.STARS.filled);
            expect(ratingIcons[2].src).toContain(ICONS.STARS.filled);
            expect(ratingIcons[3].src).toContain(ICONS.STARS.empty);

        })

        test('should increase the value by 0.5 in half ratings mode when right arrow is clicked', () => {
            const {getAllByTestId, getByTestId} = render(<Rating steps={0.5}/>)
            const starRatingContainer = getByTestId(TEST_IDS.starRatingContainer);
            const ratingIcons = getAllByTestId(TEST_IDS.ratingIcon);

            ratingIcons.forEach((icon, index) => {
                expect(icon.src).toContain(ICONS.STARS.empty);
            })

            fireKey(starRatingContainer, 'ArrowRight', 39)

            expect(ratingIcons[0].src).toContain(ICONS.STARS.half);
            expect(ratingIcons[1].src).toContain(ICONS.STARS.empty);

            fireKey(starRatingContainer, 'ArrowRight', 39)
            fireKey(starRatingContainer, 'ArrowRight', 39)

            expect(ratingIcons[0].src).toContain(ICONS.STARS.filled);
            expect(ratingIcons[1].src).toContain(ICONS.STARS.half);
            expect(ratingIcons[2].src).toContain(ICONS.STARS.empty);
            expect(ratingIcons[3].src).toContain(ICONS.STARS.empty);

            fireKey(starRatingContainer, 'ArrowRight', 39)

            expect(ratingIcons[1].src).toContain(ICONS.STARS.filled);
            expect(ratingIcons[2].src).toContain(ICONS.STARS.empty);

        })

        test('should decrease the value when left arrow is clicked', () => {
            const {getAllByTestId, getByTestId} = render(<Rating value={4}/>)
            const starRatingContainer = getByTestId(TEST_IDS.starRatingContainer);
            const ratingIcons = getAllByTestId(TEST_IDS.ratingIcon);

            expect(ratingIcons[3].src).toContain(ICONS.STARS.filled);
            expect(ratingIcons[4].src).toContain(ICONS.STARS.empty);

            fireKey(starRatingContainer, 'ArrowLeft', 37)

            expect(ratingIcons[2].src).toContain(ICONS.STARS.filled);
            expect(ratingIcons[3].src).toContain(ICONS.STARS.empty);

            fireKey(starRatingContainer, 'ArrowLeft', 37)
            fireKey(starRatingContainer, 'ArrowLeft', 37)
            fireKey(starRatingContainer, 'ArrowLeft', 37)

            expect(ratingIcons[0].src).toContain(ICONS.STARS.empty);
            expect(ratingIcons[1].src).toContain(ICONS.STARS.empty);
            expect(ratingIcons[2].src).toContain(ICONS.STARS.empty);
            expect(ratingIcons[3].src).toContain(ICONS.STARS.empty);
        })

        test('should decrease the value by 0.5 in half ratings mode when left arrow is clicked', () => {
            const {getAllByTestId, getByTestId} = render(<Rating value={3.5} steps={0.5}/>)
            const starRatingContainer = getByTestId(TEST_IDS.starRatingContainer);
            const ratingIcons = getAllByTestId(TEST_IDS.ratingIcon);

            expect(ratingIcons[2].src).toContain(ICONS.STARS.filled);
            expect(ratingIcons[3].src).toContain(ICONS.STARS.half);
            expect(ratingIcons[4].src).toContain(ICONS.STARS.empty);

            fireKey(starRatingContainer, 'ArrowLeft', 37)

            expect(ratingIcons[2].src).toContain(ICONS.STARS.filled);
            expect(ratingIcons[3].src).toContain(ICONS.STARS.empty);

            fireKey(starRatingContainer, 'ArrowLeft', 37)
            fireKey(starRatingContainer, 'ArrowLeft', 37)
            fireKey(starRatingContainer, 'ArrowLeft', 37)

            expect(ratingIcons[0].src).toContain(ICONS.STARS.filled);
            expect(ratingIcons[1].src).toContain(ICONS.STARS.half);
            expect(ratingIcons[2].src).toContain(ICONS.STARS.empty);
            expect(ratingIcons[3].src).toContain(ICONS.STARS.empty);
        })

        test('should update the value when a numeric key is pressed', () => {
            // keyCode: 49 to 53
            const {getAllByTestId, getByTestId} = render(<Rating/>)
            const starRatingContainer = getByTestId(TEST_IDS.starRatingContainer);
            const ratingIcons = getAllByTestId(TEST_IDS.ratingIcon);

            fireKey(starRatingContainer, 1, 49)

            expect(ratingIcons[0].src).toContain(ICONS.STARS.filled);
            expect(ratingIcons[1].src).toContain(ICONS.STARS.empty);

            fireKey(starRatingContainer, 5, 53)

            ratingIcons.forEach(icon => {
                expect(icon.src).toContain(ICONS.STARS.filled)
            })

            fireKey(starRatingContainer, 3, 51)

            expect(ratingIcons[0].src).toContain(ICONS.STARS.filled);
            expect(ratingIcons[1].src).toContain(ICONS.STARS.filled);
            expect(ratingIcons[2].src).toContain(ICONS.STARS.filled);
            expect(ratingIcons[3].src).toContain(ICONS.STARS.empty);

            fireKey(starRatingContainer, 1, 49)

            expect(ratingIcons[0].src).toContain(ICONS.STARS.filled);
            expect(ratingIcons[1].src).toContain(ICONS.STARS.empty);
        })
    })
})
