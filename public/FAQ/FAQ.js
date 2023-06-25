$(document).ready(function() {
    var faqs = [
        {
            question: "How do I place an order?",
            answer: "To place an order, browse the products, select the desired item, add it to your cart, and proceed to the checkout page. Fill in your shipping and payment details, review your order, and confirm the purchase."
        },
        {
            question: "What payment methods do you accept for online purchases?",
            answer: "We accept various payment methods such as credit/debit cards, PayPal, Apple Pay, Google Pay, and sometimes even cash on delivery (COD) or bank transfers."
        },
        {
            question: "How long does it take for my order to be delivered?",
            answer: "The delivery time depends on your location, shipping method, and the availability of the product. Typically, orders are delivered within 3-7 business days, but it may vary."
        },
        {
            question: "What is your return and exchange policy?",
            answer: "Our return and exchange policy allows you to return or exchange products within a specified timeframe (e.g., 30 days) if they are unused, undamaged, and in their original packaging. Please refer to our website's 'Returns and Refunds' page for detailed instructions."
        },
        {
            question: "Can I track the status of my order online?",
            answer: "Yes, you can track the status of your order online. Once your order is shipped, we provide you with a tracking number. You can enter this tracking number on our website or the courier's website to get real-time updates on the delivery status."
        },
        {
            question: "Do you offer international shipping?",
            answer: "Yes, we offer international shipping to selected countries. During the checkout process, you can enter your location to check if international shipping is available and view the associated costs."
        },
        {
            question: "Are my personal and payment details secure on your website?",
            answer: "Yes, we take the security of your personal and payment details seriously. Our website uses industry-standard encryption protocols (e.g., SSL) to ensure secure transmission of data. We also comply with relevant privacy laws to protect your information."
        },
        {
            question: "What should I do if I encounter technical issues while browsing or ordering?",
            answer: "If you encounter technical issues, we recommend clearing your browser cache, updating your browser, or trying a different browser. If the problem persists, please reach out to our customer support team for assistance."
        },
        {
            question: "Do you offer any warranties or guarantees on the products sold on your website?",
            answer: "Warranty and guarantee policies vary depending on the products. Some products may come with manufacturer warranties, while others may have specific guarantees. Please refer to the product description or contact our customer support for more information."
        },
        {
            question: "How can I contact your customer support team if I have any further questions or issues?",
            answer: "You can contact our customer support team by visiting our website's 'Contact Us' page, where you will find our email address, phone number, and possibly a live chat option. We strive to provide timely and helpful assistance to address your concerns."
        }
    ];

    var accordion = $("#accordionFAQ");

    faqs.forEach((faq, index) => {
        var answerId = "answer_" + index;
    
        var questionElement = $("<h2>").addClass("accordion-header");
        var questionButton = $("<button>").addClass("accordion-button collapsed")
            .attr({
                type: "button",
                "data-bs-toggle": "collapse",
                "data-bs-target": "#" + answerId,
                "aria-expanded": "false",
                "aria-controls": answerId
            }).html("<strong>" + faq.question + "</strong>");
        questionElement.append(questionButton);
    
        var answerElement = $("<div>").attr({
            id: answerId,
            class: "accordion-collapse collapse",
            "data-bs-parent": "#accordionFAQ"
        });
        var answerBody = $("<div>").addClass("accordion-body").text(faq.answer);
        answerBody.addClass("accordionBody");
        answerElement.append(answerBody);
    
        var accordionItem = $("<div>").addClass("accordion-item");
        accordionItem.append(questionElement, answerElement);
    
        accordion.append(accordionItem);
    });
});