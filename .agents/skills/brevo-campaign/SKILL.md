# Skill: Brevo Campaign Management

## Overview

This skill handles the programmatic creation of email templates, contact lists, and campaigns using the Brevo API (@getbrevo/brevo). It ensures emails match the site's visual identity and follow deliverability best practices.

## Capabilities

- **Template Generation**: Creates HTML email templates with dynamic fields ({{contact.FIRSTNAME}}, etc.) matching the project's Tailwind/CSS design system.
- **List Management**: Programmatically creates and populates segmented contact lists with required custom attributes.
- **Campaign Orchestration**: Sets up draft or scheduled campaigns with specific templates, lists, and subject lines.
- **Automation**: Implements Next.js API routes for automated contact addition via lead forms.

## Best Practices

- **Design Consistency**: Always use the primary color palette and typography from the site's CSS/Tailwind config.
- **Variable Usage**: Use `{{contact.ATTRIBUTE}}` for list attributes and `{{params.VALUE}}` for transactional/ad-hoc data.
- **Sender Info**: Ensure consistent sender names (e.g., "Denisse Martinez, Nearshore Navigator").
- **Error Handling**: Implement robust error checking for API limits and contact duplicates.

## Directory Structure

- `scripts/brevo/`: Location for one-off setup scripts.
- `app/api/brevo/`: Location for automated integration routes.
