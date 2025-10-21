# Custom Fonts

This directory contains custom fonts for the TeaRide mobile app.

## Font Files

Place your custom font files here. Supported formats:
- .ttf (TrueType Font)
- .otf (OpenType Font)

## Usage

To use custom fonts in your React Native app:

1. Add the font files to this directory
2. Update the `app.json` file to include the fonts
3. Use the fonts in your styles by referencing the font family name

## Example

```typescript
const styles = StyleSheet.create({
  customText: {
    fontFamily: 'YourCustomFont',
    fontSize: 16,
  },
});
```

## Font Loading

Make sure to load the fonts properly in your app. For Expo projects, fonts are automatically loaded when added to the `app.json` file.

## Recommended Fonts

- **Primary Font**: A clean, modern sans-serif font for body text
- **Heading Font**: A bold, distinctive font for headings and titles
- **Monospace Font**: A monospace font for code and numbers

## License

Ensure you have the proper licenses for any custom fonts you use in your app.

