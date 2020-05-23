# Exercise 1

In this exercise, you'll practice creating an HTML document of a fictional characer of your choice. In doing so, you'll demonstrate familiarity with basic HTML and CSS concepts. 

To complete the exercise, you will create elements in your `index.html` file, and add rules to the included in the `css/style.css` file that apply the styling notes listed below.

## HTML

We have provided you the `index.html` file for you to use, but you will need to fill in its contents using VS Code (or your preferred text editor). You can start with the [web page template](https://info340.github.io/html-fundamentals.html#web-page-template), but be sure to include the following elements:

1. A [title](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/title) for the page that is the name of your character—the browser will show this title in the browser tab, and search engine indexers will treat this as the title of the page.

2. Metadata that gives _your name_ as its [author](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta)

3. A [top-level heading](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements) with the character's name.

4. An [image](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img) of the character, specifically the one you downloaded to an `img` subdirectory (you should create this `img` folder inside of the `exercise-1/` folder). Note that the `src` attribute of the image will need to use the **relative path** to the file... and it's inside the `img` folder!

    - _Do not_ include a width or height attribute—use CSS to specify the image's appearance size instead.

    - _Do_ include a description of the image in the `alt` attribute. This will be used by assistive technologies such as screen readers for the blind, as well as search indexers.

5. A [paragraph](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/p) with a short description of the character. This only needs to be a couple sentences.

    - Within that description, include the name of what movie/series/book/comic/song/story the character is from, and make that name be a [hyperlink](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a) to another existing web page that tells me more about the work (a Wikipedia page is fine).

6. A [list](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ul) of **at least 3** reasons you admire this character. Your reasons can be as detailed and as serious or silly as you like. Your list can either be _ordered_ or _unordered_ (you could theoretically use a _descriptive_ list, but it isn't supported by the tester).


## CSS
The CSS
You should also add some CSS to make the page look a little nicer. We have provided a `css/style.css` file for you to use, but you will need to fill in the rules.

1. You will need to [link](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link) the CSS file into the HTML. Be sure to use a relative path for the file!

2. The content of the page's `body` should have a default [font size](https://developer.mozilla.org/en-US/docs/Web/CSS/font-size) of `16px`.

3. Similarly, the page should have a default [font](https://www.w3schools.com/cssref/pr_font_font-family.asp) of `'Helvetica Neue'`, followed by `Helvetica`, `Arial`, and finally `sans-serif` if the others aren't available.

4. Paragraphs should have a [line height](https://developer.mozilla.org/en-US/docs/Web/CSS/line-height) of `1.5x` the normal line height.

5. [Constrain the height](https://developer.mozilla.org/en-US/docs/Web/CSS/max-height) image to be no more than 400 pixels. If your image is already smaller than that, you won't notice any difference in appearance, but this will ensure that the image is no more than 400 pixels tall, regardless of the actual size of the image file.

6. _One item_ in your list (your choice) should be given a [color](https://developer.mozilla.org/en-US/docs/Web/CSS/color) other than the default black to highlight it as important. Use a **class selector** to apply this rule; this means you will need to modify the HTML to give one list element a class attribute. Be sure to use a [semantic name](https://css-tricks.com/semantic-class-names/) for your class!

## Testing
This exercise includes a set of unit tests to help check your work. You can run the test suite using

```bash
jest exercise-1
```

Note that not all aspects of the exercise are necessarily included in unit tests.
