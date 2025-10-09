/**
 * Messages configuration
 *
 * Defines the content for automated messages that the bot posts during setup.
 * This includes verification messages, role selection messages, server rules, and their formatting.
 *
 * CUSTOMIZATION:
 * - Edit verification.title/content to change the welcome message
 * - Modify roleSelection templates to change default formatting
 * - Add entries to customCategories to override specific role categories
 * - Edit rules.rulesList array to add/remove/modify individual server rules
 * - Use {placeholders} which get replaced: {categoryName}, {emoji}, {roleName}
 *
 * EXAMPLES:
 * - Make verification more friendly: "Hey there! Welcome to our awesome community!"
 * - Add fun formatting: "🎉 **Welcome!** 🎉" 
 * - Custom role messages: "Pick your gaming platform!" for a gaming category
 * - Add new rule: "**9. Have fun** - This is a community for enjoyment and connection!"
 */

module.exports = {
    // General settings for reaction management
    settings: {
        // Whether to automatically remove unauthorized reactions from bot-managed messages
        removeUnauthorizedReactions: true,
        // Whether to log when unauthorized reactions are removed
        logRemovals: true,
        // Whether to restore bot reactions if they're manually removed
        protectBotReactions: true,
        // Whether to validate and restore reactions on bot startup
        validateOnStartup: true
    },

    // Verification message posted in #introduction for Member role access
    verification: {
        title: "**Welcome to the server!**",
        content: "To gain access to the rest of the server, please react with ✅ below to get the Member role.\n\nThis will unlock all the community channels for you to participate in!",
        emoji: "✅",
        roleCategory: "community", // Which category contains the Member role
        roleName: "Member"
    },

    // Template for role selection messages
    roleSelection: {
        titleTemplate: "**React to get a role ({categoryName})**:", // {categoryName} gets replaced
        separator: "\n\n",
        roleLineTemplate: "{emoji}  →  {roleName}", // {emoji} and {roleName} get replaced
        footer: "", // Optional footer text
        spacing: "\n" // Between each role line
    },

    // Custom messages for specific categories (optional overrides)
    customCategories: {
        pronouns: {
            title: "**Select your pronouns**:",
            content: "Choose the pronouns you'd like others to use for you:",
            footer: "\n*You can only select one set of pronouns at a time.*"
        },
        interests: {
            title: "**What are your interests?**",
            content: "React with all that apply to get access to interest-specific channels:",
            footer: "\n*You can select multiple interests!*"
        },
        countries: {
            title: "**Where are you from?**",
            content: "Select your country/region:",
            footer: "\n*You can only select one location.*"
        }
    },

    // Server rules configuration
    rules: {
        title: "📋 **Server Rules**",
        header: "Please read and follow all rules below to maintain a positive environment for everyone:",
        footer: "Breaking these rules may result in warnings, timeouts, or bans depending on severity.\n\n**By staying in this server, you agree to follow these rules.**",
        
        // Individual rules - edit these easily!
        rulesList: [
            "**1. Be respectful** - Treat all members with kindness and respect. No harassment, bullying, or hate speech.",
            
            "**2. Keep it appropriate** - No NSFW content, excessive profanity, or inappropriate discussions in public channels.",
            
            "**3. Stay on topic** - Use channels for their intended purpose. Keep discussions relevant to the channel topic.",
            
            "**4. No spam** - Avoid repetitive messages, excessive caps, or flooding channels with content.",
            
            "**5. No advertising** - Don't promote external servers, products, or services without permission from staff.",
            
            "**6. Use common sense** - If something feels wrong or inappropriate, it probably is. When in doubt, ask staff.",
            
            "**7. Follow Discord ToS** - All Discord Terms of Service and Community Guidelines apply here.",
            
            "**8. Listen to staff** - Respect moderator decisions and follow their instructions. Appeal through proper channels if needed."
        ],
        
        // Formatting options
        separator: "\n\n", // Between each rule
        numbering: false, // Set to true if you want auto-numbering (will override manual numbers in rules)
        
        // Contact info
        contactFooter: "\n\n❓ **Questions?** Contact staff in <#staff-help> or send a DM to a moderator."
    }
};