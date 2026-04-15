import { useState, useEffect, useRef } from "react";

// ─── i18n ────────────────────────────────────────────────────────────────────
const T = {
  en: {
    appTitle:"AI Decoded", appSubtitle:"Learn, visualise & try AI concepts",
    navMap:"Concept Map", navLearn:"Learn", navTry:"Try It", navTools:"Tools & Setup", navExample:"Full Example",
    mapIntro:"Click any concept to explore it. Lines show relationships.",
    learnTitle:"AI Concepts", learnSubtitle:"Choose a concept to understand it deeply.",
    backToAll:"← All concepts", showHow:"Show me how it works", tryItBtn:"Try it →",
    tryTitle:"Try It — Playground", trySubtitle:"Pick a concept and interact with it live.",
    yourMessage:"Your message…", send:"Send",
    copilotNote:"Copy this prompt into GitHub Copilot Chat in VS Code:",
    copyPrompt:"Copy prompt", copied:"Copied!", scenario:"Scenarios",
    toolsTitle:"Tools & Setup", toolsSubtitle:"Discover tools and how to get started.",
    whereStart:"Where should I start?", complexity:"Complexity", getStarted:"Get started →",
    filterAll:"All", filterClaude:"Claude", filterCopilot:"Copilot", filterBeginner:"Beginner",
    stepByStep:"Step-by-step", close:"✕", definitionLabel:"What it is",
    analogyLabel:"Think of it like", factsLabel:"Key facts", relatedLabel:"Related concepts",
    claudeGuide:"Use with Claude", copilotGuide:"Use with GitHub Copilot",
    whereStartQ1:"What's your goal?", whereStartQ1a:"Automate tasks",
    whereStartQ1b:"Write / generate content", whereStartQ1c:"Code faster",
    whereStartQ1d:"Understand AI", whereStartResult:"Our recommendation:",
    startOver:"Start over", clearChat:"Clear chat", officialDocs:"Official docs →",
    relatedConcepts:"Related AI concepts", setupSteps:"Setup steps",
    exTitle:"Full Example: Research Newsletter Agent",
    exSubtitle:"See how every concept connects in one real-world setup — a system that automatically writes a weekly AI industry newsletter.",
    exScenario:"The scenario",
    exScenarioText:"Every Monday morning, your system automatically researches the latest AI news, writes a polished newsletter draft, fact-checks it, and emails it to subscribers — with zero manual work.",
    exHowItFits:"How each concept contributes",
    exFlow:"The full flow",
    exOutcome:"What this achieves",
    exOutcomeItems:[
      "Zero manual research — the agent handles it",
      "Consistent quality — skills enforce tone and format every time",
      "Grounded facts — RAG + references prevent hallucination",
      "Scalable — swap topics, add subagents, connect more tools via MCP",
      "Auditable — every claim is cited, every step is logged",
    ],
    exTryIt:"Try the agent scenario →",
    buildTitle:"Build Your Setup",
    buildSubtitle:"Describe your idea and get a tailored AI setup — only the concepts you actually need.",
    buildPlaceholder:"e.g. I want to automatically summarise customer emails and reply to simple ones…",
    buildBtn:"Analyse my idea →",
    buildLoading:"Analysing your idea…",
    buildReset:"Try another idea",
    buildConceptsNeeded:"Concepts you need",
    buildConceptsSkip:"Concepts you can skip",
    buildSetupPlan:"Your setup plan",
    buildStartHere:"Start here →",
    exSeePrompt:"See example prompt",
    exPickLabel:"Choose an example",
    examples:[
      { id:"newsletter", label:"Newsletter Agent", icon:"✦" },
      { id:"codereviewer", label:"Code Reviewer", icon:"◈" },
      { id:"bugfixer", label:"Bug Fixer Agent", icon:"◆" },
      { id:"commitwriter", label:"Commit Writer", icon:"▸" },
    ],
    exCopyPrompt:"Copy prompt",
    exHowPrompted:"How this concept is prompted in the newsletter system:",
  },
  nl: {
    appTitle:"AI Ontcijferd", appSubtitle:"Leer, visualiseer & probeer AI-concepten",
    navMap:"Conceptkaart", navLearn:"Leren", navTry:"Probeer het", navTools:"Tools & Installatie", navExample:"Volledig Voorbeeld",
    mapIntro:"Klik op een concept om het te verkennen. Lijnen tonen verbanden.",
    learnTitle:"AI-concepten", learnSubtitle:"Kies een concept om het grondig te begrijpen.",
    backToAll:"← Alle concepten", showHow:"Laat zien hoe het werkt", tryItBtn:"Probeer het →",
    tryTitle:"Probeer het — Speeltuin", trySubtitle:"Kies een concept en werk er live mee.",
    yourMessage:"Jouw bericht…", send:"Verstuur",
    copilotNote:"Kopieer deze prompt naar GitHub Copilot Chat in VS Code:",
    copyPrompt:"Kopieer prompt", copied:"Gekopieerd!", scenario:"Scenario's",
    toolsTitle:"Tools & Installatie", toolsSubtitle:"Ontdek tools en hoe je begint.",
    whereStart:"Waar moet ik beginnen?", complexity:"Complexiteit", getStarted:"Aan de slag →",
    filterAll:"Alles", filterClaude:"Claude", filterCopilot:"Copilot", filterBeginner:"Beginner",
    stepByStep:"Stap voor stap", close:"✕", definitionLabel:"Wat het is",
    analogyLabel:"Stel het je voor als", factsLabel:"Kernfeiten", relatedLabel:"Gerelateerde concepten",
    claudeGuide:"Gebruik met Claude", copilotGuide:"Gebruik met GitHub Copilot",
    whereStartQ1:"Wat is je doel?", whereStartQ1a:"Taken automatiseren",
    whereStartQ1b:"Tekst schrijven / genereren", whereStartQ1c:"Sneller coderen",
    whereStartQ1d:"AI begrijpen", whereStartResult:"Onze aanbeveling:",
    startOver:"Opnieuw beginnen", clearChat:"Chat wissen", officialDocs:"Officiële docs →",
    relatedConcepts:"Gerelateerde AI-concepten", setupSteps:"Installatiestappen",
    exTitle:"Volledig Voorbeeld: Research Nieuwsbrief Agent",
    exSubtitle:"Zie hoe elk concept samenkomt in één echte setup — een systeem dat automatisch een wekelijkse AI-nieuwsbrief schrijft.",
    exScenario:"Het scenario",
    exScenarioText:"Elke maandagochtend onderzoekt je systeem automatisch het laatste AI-nieuws, schrijft een verzorgde nieuwsbrief, controleert feiten en stuurt deze naar abonnees — zonder handmatig werk.",
    exHowItFits:"Hoe elk concept bijdraagt",
    exFlow:"De volledige stroom",
    exOutcome:"Wat dit oplevert",
    exOutcomeItems:[
      "Nul handmatig onderzoek — de agent regelt het",
      "Consistente kwaliteit — skills bewaken toon en opmaak",
      "Gefundeerde feiten — RAG + referenties voorkomen hallucinaties",
      "Schaalbaar — wissel onderwerpen, voeg subagents toe via MCP",
      "Controleerbaar — elke bewering geciteerd, elke stap gelogd",
    ],
    exTryIt:"Probeer het agent-scenario →",
    buildTitle:"Bouw Jouw Setup",
    buildSubtitle:"Beschrijf je idee en krijg een op maat gemaakte AI-setup — alleen de concepten die je echt nodig hebt.",
    buildPlaceholder:"bijv. Ik wil automatisch klant-e-mails samenvatten en eenvoudige beantwoorden…",
    buildBtn:"Analyseer mijn idee →",
    buildLoading:"Idee wordt geanalyseerd…",
    buildReset:"Probeer een ander idee",
    buildConceptsNeeded:"Concepten die je nodig hebt",
    buildConceptsSkip:"Concepten die je kunt overslaan",
    buildSetupPlan:"Jouw setup-plan",
    buildStartHere:"Begin hier →",
    exSeePrompt:"Zie voorbeeldprompt",
    exPickLabel:"Kies een voorbeeld",
    examples:[
      { id:"newsletter", label:"Nieuwsbrief Agent", icon:"✦" },
      { id:"codereviewer", label:"Code Reviewer", icon:"◈" },
      { id:"bugfixer", label:"Bug Fixer Agent", icon:"◆" },
      { id:"commitwriter", label:"Commit Schrijver", icon:"▸" },
    ],
    exCopyPrompt:"Kopieer prompt",
    exHowPrompted:"Hoe dit concept wordt geprompt in het nieuwsbriefssysteem:",
  },
};

// ─── CONCEPTS ────────────────────────────────────────────────────────────────
const CONCEPTS = [
  { id:"models", icon:"M", color:"#00D4FF", x:50, y:10, related:["tokens","agents"],
    en:{ label:"Models", short:"The AI brain",
      definition:"A model is a trained neural network that processes your input and generates a response. Different models differ in capability, speed, cost, and context window size.",
      analogy:"Like a person's brain — trained on vast experience, better at some things depending on background and training.",
      facts:[{k:"Examples",v:"Claude Sonnet, GPT-4o, Gemini 1.5"},{k:"Input",v:"Text, images, documents (tokens)"},{k:"Output",v:"Text, structured data, tool calls"},{k:"Choose by",v:"Speed, cost, capability, context size"}],
      claudeGuide:{access:"claude.ai, Anthropic API, or Claude Code CLI",example:"Go to claude.ai and start chatting. For API use model: 'claude-sonnet-4-20250514'",steps:["Visit claude.ai","Create an account","Choose a plan","Start prompting"],docsUrl:"https://docs.anthropic.com"},
      copilotGuide:{access:"GitHub Copilot Chat in VS Code",example:"In Copilot Chat: 'Which model is best for summarising long documents?'",steps:["Install GitHub Copilot in VS Code","Sign in with GitHub","Open Copilot Chat (Ctrl+Shift+I)","Ask about models"],docsUrl:"https://docs.github.com/copilot"},
      scenarios:[{label:"Compare models",prompt:"Compare Claude Sonnet vs GPT-4o: which is better for summarising legal documents and why?"},{label:"Pick a model",prompt:"I need to build a chatbot for a 200-page PDF. Which AI model should I use and why?"}],
      walkthrough:["You send text as input","Text is split into tokens","Tokens pass through the model","Model predicts next tokens","Response streams back to you"],
    },
    nl:{ label:"Modellen", short:"Het AI-brein",
      definition:"Een model is een getraind neuraal netwerk dat jouw invoer verwerkt en een antwoord genereert.",
      analogy:"Zoals het brein van een persoon — getraind op enorme ervaring.",
      facts:[{k:"Voorbeelden",v:"Claude Sonnet, GPT-4o, Gemini 1.5"},{k:"Invoer",v:"Tekst, afbeeldingen, documenten"},{k:"Uitvoer",v:"Tekst, gestructureerde data"},{k:"Kies op",v:"Snelheid, kosten, vermogen"}],
      claudeGuide:{access:"claude.ai, Anthropic API, of Claude Code CLI",example:"Ga naar claude.ai en begin te chatten.",steps:["Bezoek claude.ai","Maak een account","Kies een plan","Begin met prompts"],docsUrl:"https://docs.anthropic.com"},
      copilotGuide:{access:"GitHub Copilot Chat in VS Code",example:"Typ: 'Welk model is het beste voor lange documenten?'",steps:["Installeer GitHub Copilot","Meld je aan","Open Copilot Chat","Stel je vraag"],docsUrl:"https://docs.github.com/copilot"},
      scenarios:[{label:"Modellen vergelijken",prompt:"Vergelijk Claude Sonnet met GPT-4o: welke is beter voor juridische documenten?"},{label:"Kies een model",prompt:"Ik wil een chatbot bouwen voor een PDF van 200 pagina's. Welk model gebruik ik?"}],
      walkthrough:["Je stuurt tekst als invoer","Tekst wordt opgesplitst in tokens","Tokens gaan door het model","Model voorspelt volgende tokens","Antwoord stroomt terug"],
    },
  },
  { id:"tokens", icon:"T", color:"#FF6B35", x:20, y:30, related:["models","rag"],
    en:{ label:"Token Context", short:"Memory & input size",
      definition:"Tokens are chunks of text (~4 chars each). The context window is the maximum text a model can process at once — its working memory.",
      analogy:"Like a whiteboard. When it's full, older content must be erased to make room.",
      facts:[{k:"1 token",v:"~4 chars or 3/4 of a word"},{k:"Claude",v:"200K token context window"},{k:"Cost",v:"Input and output tokens both billed"},{k:"Limits",v:"Long docs hit the ceiling"}],
      claudeGuide:{access:"console.anthropic.com usage dashboard",example:"Upload a 50-page PDF to Claude — it fits in 200K context. Ask 'summarise chapter 3'.",steps:["Open claude.ai","Upload a document","Claude tokenises automatically","Check usage in dashboard"],docsUrl:"https://docs.anthropic.com"},
      copilotGuide:{access:"Copilot reads open VS Code files as context",example:"Open related files — Copilot sees them all as context when suggesting.",steps:["Open relevant files","Copilot reads open files","Add @workspace for full project","Use #file: to pin a file"],docsUrl:"https://docs.github.com/copilot"},
      scenarios:[{label:"Token estimator",prompt:"How many tokens would a 20-page Word document use? Would it fit in Claude's context window?"},{label:"Long doc strategy",prompt:"I have a 500-page contract. What's the best strategy to analyse it with AI given context limits?"}],
      walkthrough:["Text split into tokens","Tokens enter the context window","Model attends to all tokens","Output tokens generated one by one","Full response returned"],
    },
    nl:{ label:"Token Context", short:"Geheugen & invoergrootte",
      definition:"Tokens zijn stukjes tekst (~4 tekens). Het contextvenster is de maximale tekst die een model tegelijk verwerkt.",
      analogy:"Zoals een whiteboard — als het vol is, moet oudere inhoud worden gewist.",
      facts:[{k:"1 token",v:"~4 tekens of 3/4 woord"},{k:"Claude",v:"200K token contextvenster"},{k:"Kosten",v:"Invoer- en uitvoertokens gefactureerd"},{k:"Limieten",v:"Lange docs bereiken het plafond"}],
      claudeGuide:{access:"console.anthropic.com gebruiksdashboard",example:"Upload een PDF van 50 pagina's — past in 200K context.",steps:["Open claude.ai","Upload document","Claude tokeniseert automatisch","Bekijk gebruik in dashboard"],docsUrl:"https://docs.anthropic.com"},
      copilotGuide:{access:"Copilot leest geopende VS Code bestanden als context",example:"Open gerelateerde bestanden — Copilot ziet ze als context.",steps:["Open relevante bestanden","Copilot leest open bestanden","Voeg @workspace toe","Gebruik #file: om vast te zetten"],docsUrl:"https://docs.github.com/copilot"},
      scenarios:[{label:"Token-schatting",prompt:"Hoeveel tokens gebruikt een Word-document van 20 pagina's? Past dat in Claude's contextvenster?"},{label:"Lange documenten",prompt:"Ik heb een contract van 500 pagina's. Wat is de beste strategie met AI?"}],
      walkthrough:["Tekst opgesplitst in tokens","Tokens in contextvenster","Model verwerkt alle tokens","Uitvoertokens gegenereerd","Volledig antwoord teruggegeven"],
    },
  },
  { id:"agents", icon:"A", color:"#7C3AED", x:80, y:30, related:["models","subagents","mcp","skills","prompts"],
    en:{ label:"Agents", short:"AI that takes action",
      definition:"An agent plans, uses tools, makes decisions, and loops until a goal is achieved. It can browse the web, run code, and call APIs.",
      analogy:"Like hiring an employee: you give a goal, they figure out the steps and use available tools.",
      facts:[{k:"Loop",v:"Think → Act → Observe → Repeat"},{k:"Tools",v:"Search, code execution, APIs"},{k:"Autonomy",v:"Multiple decisions without you"},{k:"Risk",v:"Mistakes compound — needs guardrails"}],
      claudeGuide:{access:"Claude.ai with Tools enabled, or Claude Code CLI",example:"Enable web search and ask: 'Research top 5 AI coding tools in 2025 and compare them.'",steps:["Open claude.ai","Enable Tools in settings","Give a multi-step goal","Watch it plan and execute"],docsUrl:"https://docs.anthropic.com"},
      copilotGuide:{access:"GitHub Copilot Agent mode in VS Code",example:"Switch to Agent mode: 'Refactor my auth module to use JWT and update all tests.'",steps:["Open Copilot Chat","Click mode → Agent","Describe multi-step task","Copilot plans, edits, runs tests"],docsUrl:"https://docs.github.com/copilot"},
      scenarios:[{label:"Agent loop demo",prompt:"Act as an AI agent. Goal: research React performance best practices. Show step by step: what you think, which tools you'd call, what you observe, and how you loop."},{label:"Build an agent",prompt:"How would I build an agent that monitors a competitor website and emails me a summary every Monday?"}],
      walkthrough:["You give the agent a goal","Agent breaks goal into steps","Agent calls a tool","Agent observes result","Agent decides next action","Loop until goal complete"],
    },
    nl:{ label:"Agents", short:"AI die actie onderneemt",
      definition:"Een agent plant, gebruikt tools, neemt beslissingen en herhaalt dit totdat een doel is bereikt.",
      analogy:"Zoals een medewerker: je geeft een doel, zij bepalen de stappen en gebruiken beschikbare tools.",
      facts:[{k:"Lus",v:"Denk → Handel → Observeer → Herhaal"},{k:"Tools",v:"Zoeken, code uitvoeren, API's"},{k:"Autonomie",v:"Meerdere beslissingen zonder jou"},{k:"Risico",v:"Fouten stapelen op — heeft begrenzing nodig"}],
      claudeGuide:{access:"Claude.ai met Tools, of Claude Code CLI",example:"Schakel zoeken in en vraag: 'Onderzoek top 5 AI-codeertools van 2025 en vergelijk ze.'",steps:["Open claude.ai","Schakel Tools in","Geef meerstaps doel","Bekijk hoe het uitvoert"],docsUrl:"https://docs.anthropic.com"},
      copilotGuide:{access:"GitHub Copilot Agent-modus in VS Code",example:"Agent-modus: 'Refactor mijn auth-module naar JWT en update alle tests.'",steps:["Open Copilot Chat","Klik modus → Agent","Beschrijf meerstaps taak","Copilot plant en voert uit"],docsUrl:"https://docs.github.com/copilot"},
      scenarios:[{label:"Agent-lus demo",prompt:"Handel als AI-agent. Doel: onderzoek React-prestaties. Laat stap voor stap zien: wat je denkt, welke tools je aanroept, wat je observeert."},{label:"Bouw een agent",prompt:"Hoe bouw ik een agent die een concurrent monitort en mij elke maandag een samenvatting mailt?"}],
      walkthrough:["Je geeft de agent een doel","Agent breekt doel op in stappen","Agent roept een tool aan","Agent observeert resultaat","Agent bepaalt volgende actie","Lus tot doel bereikt"],
    },
  },
  { id:"subagents", icon:"S", color:"#10B981", x:72, y:52, related:["agents","skills"],
    en:{ label:"Subagents", short:"Specialised helpers",
      definition:"A subagent is spawned by an orchestrator agent to handle a specific subtask. The orchestrator delegates to specialists and combines their results.",
      analogy:"A project manager delegates to a researcher, writer, and fact-checker — each expert in their role.",
      facts:[{k:"Pattern",v:"Orchestrator → A + B + C → Merge"},{k:"Benefits",v:"Parallelism, specialisation"},{k:"Used in",v:"Claude Code, CrewAI, LangGraph"}],
      claudeGuide:{access:"Claude Code CLI or chained API calls",example:"Chain multiple Claude calls where output of one feeds the next.",steps:["Use Claude Code for auto subagent spawning","Or chain API calls manually","Each subagent gets a focused prompt","Merge results in final call"],docsUrl:"https://docs.anthropic.com"},
      copilotGuide:{access:"Copilot Agent mode multi-step tasks",example:"Give Agent a complex task — it internally delegates to specialised steps.",steps:["Switch to Agent mode","Give a multi-part task","Copilot breaks into sub-tasks","Review each result"],docsUrl:"https://docs.github.com/copilot"},
      scenarios:[{label:"Design a system",prompt:"Design a multi-agent system for 'write a weekly AI newsletter'. Show the full orchestrator → subagent flow with what each agent does."},{label:"Parallel agents",prompt:"How do I use parallel subagents to research 5 news topics simultaneously? Explain the pattern."}],
      walkthrough:["Orchestrator receives goal","Decomposes into parallel subtasks","Each subagent gets focused prompt","Subagents work simultaneously","Results merged by orchestrator"],
    },
    nl:{ label:"Subagents", short:"Gespecialiseerde helpers",
      definition:"Een subagent wordt aangemaakt door een orchestrator om een specifieke deeltaak uit te voeren.",
      analogy:"Een projectmanager delegeert aan een onderzoeker, schrijver en factchecker — elk expert in hun rol.",
      facts:[{k:"Patroon",v:"Orchestrator → A + B + C → Samenvoegen"},{k:"Voordelen",v:"Parallellisme, specialisatie"},{k:"Gebruikt in",v:"Claude Code, CrewAI, LangGraph"}],
      claudeGuide:{access:"Claude Code CLI of geketende API-aanroepen",example:"Keten meerdere Claude-aanroepen waarbij uitvoer van één de invoer van een ander wordt.",steps:["Gebruik Claude Code","Of keten API-aanroepen","Elke subagent gerichte prompt","Voeg samen in laatste aanroep"],docsUrl:"https://docs.anthropic.com"},
      copilotGuide:{access:"Copilot Agent meerstaps taken",example:"Geef Agent een complexe taak — het delegeert intern naar gespecialiseerde stappen.",steps:["Schakel naar Agent-modus","Geef meerdelige taak","Copilot splitst intern op","Bekijk elk resultaat"],docsUrl:"https://docs.github.com/copilot"},
      scenarios:[{label:"Ontwerp een systeem",prompt:"Ontwerp een multi-agentsysteem voor 'schrijf een wekelijkse AI-nieuwsbrief'. Toon de volledige stroom."},{label:"Parallelle agents",prompt:"Hoe gebruik ik parallelle subagents om 5 nieuwsonderwerpen tegelijk te onderzoeken?"}],
      walkthrough:["Orchestrator ontvangt doel","Splitst op in parallelle subtaken","Elke subagent krijgt gerichte prompt","Subagents werken tegelijkertijd","Resultaten samengevoegd"],
    },
  },
  { id:"skills", icon:"SK", color:"#F59E0B", x:50, y:52, related:["agents","subagents","references"],
    en:{ label:"Skills", short:"Reusable instructions",
      definition:"Skills are reusable markdown instruction files that tell an AI how to perform a task correctly and consistently every time.",
      analogy:"Like a recipe card — anyone who reads it can perform the task without reinventing the wheel.",
      facts:[{k:"Format",v:"Markdown files with instructions"},{k:"Stored in",v:"/skills folder the AI reads"},{k:"Used by",v:"Agents reading before tasks"},{k:"Benefit",v:"Consistency and reusability"}],
      claudeGuide:{access:"Claude Code reads SKILL.md from /skills directory",example:"Create /skills/writer/SKILL.md. Claude Code reads it before every writing task.",steps:["Create /skills directory","Add SKILL.md per task type","Reference in Claude Code prompts","Claude reads and follows automatically"],docsUrl:"https://docs.anthropic.com"},
      copilotGuide:{access:".github/copilot-instructions.md for persistent instructions",example:"Write your coding standards — Copilot follows them in every suggestion.",steps:["Create .github/copilot-instructions.md","Write your coding standards","Copilot reads automatically","All suggestions follow your style"],docsUrl:"https://docs.github.com/copilot"},
      scenarios:[{label:"Create a skill",prompt:"Help me write a SKILL.md that teaches an AI to write professional business emails in a warm, concise tone. Include tone, structure, and an example."},{label:"Skills vs prompts",prompt:"What's the difference between a SKILL.md and a detailed prompt each time? When should I use each approach?"}],
      walkthrough:["You define skill as a markdown file","Skill describes task and constraints","Agent reads skill before starting","Follows instructions precisely","Output consistent every time"],
    },
    nl:{ label:"Skills", short:"Herbruikbare instructies",
      definition:"Skills zijn herbruikbare markdown-instructiebestanden die een AI vertellen hoe een taak correct wordt uitgevoerd.",
      analogy:"Zoals een receptkaart — iedereen die het leest kan de taak uitvoeren.",
      facts:[{k:"Formaat",v:"Markdown-bestanden met instructies"},{k:"Opgeslagen in",v:"/skills map"},{k:"Gebruikt door",v:"Agents voor taakuitvoering"},{k:"Voordeel",v:"Consistentie en herbruikbaarheid"}],
      claudeGuide:{access:"Claude Code leest SKILL.md uit /skills-map",example:"Maak /skills/schrijver/SKILL.md. Claude Code leest het voor elke schrijftaak.",steps:["Maak /skills-map","Voeg SKILL.md toe per taaktype","Verwijs in Claude Code-prompts","Claude leest automatisch"],docsUrl:"https://docs.anthropic.com"},
      copilotGuide:{access:".github/copilot-instructions.md voor permanente instructies",example:"Schrijf je coderingsstandaarden — Copilot volgt ze in elke suggestie.",steps:["Maak .github/copilot-instructions.md","Schrijf je normen","Copilot leest automatisch","Suggesties volgen je stijl"],docsUrl:"https://docs.github.com/copilot"},
      scenarios:[{label:"Maak een skill",prompt:"Help me een SKILL.md schrijven dat een AI leert professionele zakelijke e-mails te schrijven in een warme, beknopte toon."},{label:"Skills vs prompts",prompt:"Wat is het verschil tussen een SKILL.md en elke keer een gedetailleerde prompt? Wanneer gebruik ik elk?"}],
      walkthrough:["Jij definieert skill als markdown","Skill beschrijft taak en beperkingen","Agent leest skill voor begin","Volgt instructies nauwkeurig","Uitvoer elke keer consistent"],
    },
  },
  { id:"rag", icon:"R", color:"#EC4899", x:20, y:74, related:["tokens","references"],
    en:{ label:"RAG Context", short:"Give AI your data",
      definition:"RAG (Retrieval-Augmented Generation) fetches relevant documents from a database and inserts them into the AI's context so it can answer questions about your private data.",
      analogy:"Like an open-book exam — instead of memorised knowledge, the AI looks things up in materials you provide.",
      facts:[{k:"Problem",v:"AI doesn't know your private data"},{k:"How",v:"Query → Retrieve → Prompt → Answer"},{k:"Storage",v:"Vector DB (Pinecone, pgvector)"},{k:"Used for",v:"Chatbots on docs, support"}],
      claudeGuide:{access:"Claude API with documents in messages array",example:"Retrieve paragraphs from DB, insert into Claude: 'Based on: [chunks]... answer: [question]'",steps:["Chunk docs into 500-1000 token pieces","Store in vector database","Retrieve top-k matching chunks","Add chunks to Claude's prompt"],docsUrl:"https://docs.anthropic.com"},
      copilotGuide:{access:"@workspace and #file as manual RAG",example:"'@workspace How does our auth middleware work?' — Copilot retrieves relevant files.",steps:["Use @workspace to search codebase","Use #file: to pin files","Copilot retrieves context","Ask about your specific code"],docsUrl:"https://docs.github.com/copilot"},
      scenarios:[{label:"RAG explained",prompt:"Walk me through exactly how RAG works with a concrete example: I have a 1000-page company handbook and want employees to ask questions about it."},{label:"Build a RAG system",prompt:"What tools and steps do I need to build a simple RAG chatbot for my company's PDF documents?"}],
      walkthrough:["User asks a question","Question turned into embedding","Similar chunks retrieved from DB","Chunks added to AI prompt","AI answers with retrieved knowledge"],
    },
    nl:{ label:"RAG Context", short:"Geef AI jouw data",
      definition:"RAG haalt relevante documenten op uit een database en voegt ze in de AI-context in om vragen over jouw privédata te beantwoorden.",
      analogy:"Zoals een open-boekexamen — de AI zoekt op in materialen die jij aanlevert.",
      facts:[{k:"Probleem",v:"AI kent jouw privédata niet"},{k:"Werking",v:"Vraag → Ophalen → Prompt → Antwoord"},{k:"Opslag",v:"Vectordatabase (Pinecone, pgvector)"},{k:"Gebruikt voor",v:"Chatbots op docs, support"}],
      claudeGuide:{access:"Claude API met documenten in berichten-array",example:"Haal alinea's op, voeg in Claude in: 'Op basis van: [stukken]... beantwoord: [vraag]'",steps:["Splits docs op in stukken","Sla op in vectordatabase","Haal relevante stukken op","Voeg toe aan Claude-prompt"],docsUrl:"https://docs.anthropic.com"},
      copilotGuide:{access:"@workspace en #file als handmatige RAG",example:"'@workspace Hoe werkt onze auth-middleware?' — Copilot haalt relevante bestanden op.",steps:["Gebruik @workspace","Gebruik #file: voor specifiek bestand","Copilot haalt context op","Vraag over je specifieke code"],docsUrl:"https://docs.github.com/copilot"},
      scenarios:[{label:"RAG uitgelegd",prompt:"Leg precies uit hoe RAG werkt: ik heb een bedrijfshandboek van 1000 pagina's en wil dat medewerkers er vragen over stellen."},{label:"Bouw een RAG-systeem",prompt:"Welke tools en stappen heb ik nodig voor een eenvoudige RAG-chatbot voor onze bedrijfs-PDFs?"}],
      walkthrough:["Gebruiker stelt vraag","Vraag omgezet in embedding","Vergelijkbare stukken opgehaald","Stukken toegevoegd aan prompt","AI antwoordt met opgehaalde kennis"],
    },
  },
  { id:"references", icon:"Rf", color:"#6366F1", x:50, y:92, related:["rag","models","skills"],
    en:{ label:"References", short:"Cited sources",
      definition:"References are cited sources that ground an AI's response in verifiable information, reducing hallucination and letting users verify every claim.",
      analogy:"Like footnotes in an academic paper — every claim traces back to a source so you know it's not made up.",
      facts:[{k:"Problem",v:"AI can hallucinate false info"},{k:"Solution",v:"Cite source chunks with claims"},{k:"Formats",v:"Inline citations, footnotes"},{k:"Used in",v:"Perplexity, Bing Chat, Claude"}],
      claudeGuide:{access:"Claude.ai with web search, or API with document citations",example:"Enable web search, ask a factual question — Claude cites sources inline.",steps:["Enable web search in Claude","Ask a factual question","Claude returns cited responses","Or pass docs via API and ask to cite"],docsUrl:"https://docs.anthropic.com"},
      copilotGuide:{access:"Copilot Chat shows file references automatically",example:"Ask with @workspace — Copilot shows which files it referenced.",steps:["Ask a question with @workspace","References listed at bottom","Click to open the file","Verify against source code"],docsUrl:"https://docs.github.com/copilot"},
      scenarios:[{label:"Enforce citations",prompt:"Give me a prompt template that forces an AI to always cite sources for every factual claim it makes."},{label:"Reduce hallucination",prompt:"What are the 5 best techniques to reduce AI hallucination when using it for factual research?"}],
      walkthrough:["AI generates a response","Links each claim to a source","User sees citation markers","User clicks to verify source","Trust in output increases"],
    },
    nl:{ label:"Referenties", short:"Geciteerde bronnen",
      definition:"Referenties zijn geciteerde bronnen die de AI-reactie verankeren in verifieerbare informatie en hallucinaties verminderen.",
      analogy:"Zoals voetnoten — elke bewering is te herleiden naar een bron.",
      facts:[{k:"Probleem",v:"AI kan valse informatie hallucineren"},{k:"Oplossing",v:"Citeer bronstukken bij beweringen"},{k:"Formaten",v:"Inline-citaten, voetnoten"},{k:"Gebruikt in",v:"Perplexity, Bing Chat, Claude"}],
      claudeGuide:{access:"Claude.ai met webzoeken of API-citaten",example:"Schakel webzoeken in, stel feitelijke vraag — Claude citeert inline.",steps:["Schakel webzoeken in","Stel feitelijke vraag","Claude geeft geciteerde reacties","Of geef docs via API en vraag te citeren"],docsUrl:"https://docs.anthropic.com"},
      copilotGuide:{access:"Copilot Chat toont bestandsreferenties automatisch",example:"Vraag met @workspace — Copilot toont geraadpleegde bestanden.",steps:["Stel vraag met @workspace","Referenties onderaan","Klik om te openen","Verifieer met broncode"],docsUrl:"https://docs.github.com/copilot"},
      scenarios:[{label:"Citaten afdwingen",prompt:"Geef me een promptsjabloon dat een AI dwingt altijd bronnen te citeren bij elke feitelijke bewering."},{label:"Verminder hallucinatie",prompt:"Wat zijn de 5 beste technieken om AI-hallucinatie te verminderen bij feitelijk onderzoek?"}],
      walkthrough:["AI genereert een reactie","Koppelt bewering aan bron","Gebruiker ziet citatiemarkering","Gebruiker verifieert bron","Vertrouwen in uitvoer neemt toe"],
    },
  },
  { id:"mcp", icon:"MC", color:"#14B8A6", x:80, y:52, related:["agents","subagents"],
    en:{ label:"MCP Servers", short:"Tool connectors",
      definition:"MCP (Model Context Protocol) lets AI models connect to external tools and data sources through a unified interface — like a USB port for AI capabilities.",
      analogy:"Like an app store for AI — install MCP servers to give the AI new capabilities on demand.",
      facts:[{k:"Full name",v:"Model Context Protocol"},{k:"By",v:"Anthropic (open standard)"},{k:"Examples",v:"GitHub, Slack, Database MCPs"},{k:"Benefit",v:"Tools without custom integration code"}],
      claudeGuide:{access:"Claude Desktop app or Claude Code CLI",example:"Install GitHub MCP in Claude Desktop. Claude can now read repos, create PRs, manage issues.",steps:["Download Claude Desktop","Settings → MCP Servers","Add an MCP server","Claude gains that tool"],docsUrl:"https://docs.anthropic.com/mcp"},
      copilotGuide:{access:"GitHub Copilot Extensions",example:"Install Jira Copilot Extension. Ask Copilot to create tickets directly from VS Code.",steps:["Go to GitHub Marketplace","Find Copilot Extensions","Install an extension","Use @extension-name in Chat"],docsUrl:"https://docs.github.com/copilot/extensions"},
      scenarios:[{label:"What is MCP?",prompt:"Explain the Model Context Protocol to a developer who has never heard of it. What problem does it solve and why is it significant?"},{label:"MCP setup",prompt:"Walk me through setting up the GitHub MCP server with Claude Desktop step by step."}],
      walkthrough:["User installs an MCP server","Server exposes tools to the AI","AI discovers available tools","AI calls a tool during a task","Tool returns data to AI context","AI uses data to complete task"],
    },
    nl:{ label:"MCP-servers", short:"Tool-connectoren",
      definition:"MCP laat AI-modellen verbinding maken met externe tools via een uniforme interface — zoals een USB-poort voor AI-mogelijkheden.",
      analogy:"Zoals een app store voor AI — installeer MCP-servers voor nieuwe mogelijkheden op aanvraag.",
      facts:[{k:"Volledige naam",v:"Model Context Protocol"},{k:"Door",v:"Anthropic (open standaard)"},{k:"Voorbeelden",v:"GitHub, Slack, Database MCP's"},{k:"Voordeel",v:"Tools zonder aangepaste integratiecode"}],
      claudeGuide:{access:"Claude Desktop-app of Claude Code CLI",example:"Installeer GitHub MCP in Claude Desktop. Claude kan nu repos lezen en PR's aanmaken.",steps:["Download Claude Desktop","Instellingen → MCP-servers","Voeg MCP-server toe","Claude heeft die tool"],docsUrl:"https://docs.anthropic.com/mcp"},
      copilotGuide:{access:"GitHub Copilot Extensions",example:"Installeer Jira Copilot Extension. Vraag Copilot tickets aan te maken vanuit VS Code.",steps:["Ga naar GitHub Marketplace","Zoek Copilot Extensions","Installeer een extensie","Gebruik @extensienaam in Chat"],docsUrl:"https://docs.github.com/copilot/extensions"},
      scenarios:[{label:"Wat is MCP?",prompt:"Leg het Model Context Protocol uit aan een developer die er nooit van gehoord heeft. Welk probleem lost het op?"},{label:"MCP installeren",prompt:"Begeleid me stap voor stap bij het instellen van de GitHub MCP-server met Claude Desktop."}],
      walkthrough:["Gebruiker installeert MCP-server","Server stelt tools beschikbaar","AI ontdekt beschikbare tools","AI roept tool aan tijdens taak","Tool geeft data terug","AI voltooit de taak"],
    },
  },
  { id:"coworkers", icon:"CW", color:"#F97316", x:20, y:52, related:["agents","subagents","skills"],
    en:{ label:"Coworkers", short:"AI teammates",
      definition:"AI coworkers are persistent agents with ongoing roles — working alongside humans with memory across sessions, like a dedicated researcher or analyst.",
      analogy:"Like a virtual colleague who remembers context and proactively contributes to shared goals.",
      facts:[{k:"vs Agents",v:"Persistent roles vs completing tasks"},{k:"Memory",v:"Context maintained across sessions"},{k:"Tools",v:"Cowork by Anthropic (beta)"}],
      claudeGuide:{access:"Cowork desktop app (Anthropic beta)",example:"Set up a 'Research Assistant' coworker with a system prompt, memory, and tools.",steps:["Download Cowork app","Create coworker with a role","Assign tools and memory","Delegate ongoing tasks"],docsUrl:"https://anthropic.com"},
      copilotGuide:{access:"GitHub Copilot for Teams / Workspace",example:"Use Copilot Workspace for AI-assisted workflow across sessions and team members.",steps:["Enable Copilot for your org","Use Copilot Workspace","Define conventions in instructions.md","All team members benefit"],docsUrl:"https://docs.github.com/copilot"},
      scenarios:[{label:"Design a coworker",prompt:"Design an AI coworker for a marketing team. What role, system prompt, memory, and tools does it need to be useful daily?"},{label:"Human + AI team",prompt:"How would 3 humans and 2 AI coworkers collaborate to produce a weekly newsletter? Who does what?"}],
      walkthrough:["Coworker assigned a persistent role","Receives tasks from humans","Maintains memory across sessions","Proactively contributes to goals","Humans review and guide work"],
    },
    nl:{ label:"Coworkers", short:"AI-teamgenoten",
      definition:"AI-coworkers zijn persistente agents met doorlopende rollen die naast mensen werken met geheugen over sessies.",
      analogy:"Zoals een virtuele collega die context onthoudt en proactief bijdraagt aan gedeelde doelen.",
      facts:[{k:"vs Agents",v:"Persistente rollen vs taken voltooien"},{k:"Geheugen",v:"Context over meerdere sessies"},{k:"Tools",v:"Cowork van Anthropic (beta)"}],
      claudeGuide:{access:"Cowork desktop-app (Anthropic beta)",example:"Stel 'Onderzoeksassistent' in met systeemprompt, geheugen en tools.",steps:["Download Cowork-app","Maak coworker met rol","Wijs tools en geheugen toe","Delegeer doorlopende taken"],docsUrl:"https://anthropic.com"},
      copilotGuide:{access:"GitHub Copilot voor Teams / Workspace",example:"Gebruik Copilot Workspace voor AI-workflow over sessies en teamleden heen.",steps:["Schakel Copilot in voor org","Gebruik Copilot Workspace","Definieer conventies","Heel team profiteert"],docsUrl:"https://docs.github.com/copilot"},
      scenarios:[{label:"Ontwerp een coworker",prompt:"Ontwerp een AI-coworker voor een marketingteam. Welke rol, prompt, geheugen en tools heeft het nodig?"},{label:"Mens + AI-team",prompt:"Hoe werken 3 mensen en 2 AI-coworkers samen aan een wekelijkse nieuwsbrief?"}],
      walkthrough:["Coworker krijgt persistente rol","Ontvangt taken van mensen","Bewaart geheugen over sessies","Draagt proactief bij aan doelen","Mensen beoordelen en begeleiden werk"],
    },
  },

  { id:"claudemd", icon:"CL", color:"#c084fc", x:36, y:76, related:["skills","agents","rag"],
    en:{ label:"CLAUDE.md", short:"Claude's persistent instructions",
      definition:"CLAUDE.md is a markdown file placed in your project root that Claude Code reads automatically before every task. It defines your project's rules, conventions, architecture decisions, and preferred workflows — giving Claude persistent context it would otherwise have to rediscover every session.",
      analogy:"Like a staff handbook for a new hire. Before their first day, they read it so they already know your team's processes, coding style, and unwritten rules — without you having to explain everything from scratch each time.",
      facts:[
        {k:"Location",v:"Project root: CLAUDE.md (or .claude/CLAUDE.md)"},
        {k:"Read by",v:"Claude Code automatically before every task"},
        {k:"Contains",v:"Architecture, conventions, commands, context"},
        {k:"Scope",v:"Project-specific — different per repo"},
      ],
      claudeGuide:{
        access:"Create CLAUDE.md in the root of any project Claude Code works in",
        example:"# My Project\n\n## Stack\nNext.js 14, TypeScript, Tailwind\n\n## Conventions\n- Use functional components only\n- All API calls go through /lib/api.ts\n- Never commit .env files\n\n## Common commands\n- npm run dev (start)\n- npm run test (jest)",
        steps:[
          "Create a file called CLAUDE.md in your project root",
          "Add sections: stack, conventions, commands, architecture notes",
          "Run claude in that folder — it reads CLAUDE.md automatically",
          "Update it whenever your conventions change",
        ],
        docsUrl:"https://docs.anthropic.com/claude-code",
      },
      copilotGuide:{
        access:"GitHub Copilot uses .github/copilot-instructions.md instead",
        example:"CLAUDE.md is Claude Code-specific. For Copilot, use .github/copilot-instructions.md — see that concept for details.",
        steps:[
          "CLAUDE.md is not read by GitHub Copilot",
          "For Copilot, create .github/copilot-instructions.md",
          "The two files serve the same purpose for different tools",
          "You can maintain both files in the same project",
        ],
        docsUrl:"https://docs.github.com/copilot/customising",
      },
      scenarios:[
        {label:"Write a CLAUDE.md",prompt:"Help me write a CLAUDE.md file for a Next.js 14 project using TypeScript and Tailwind. Include: stack overview, coding conventions, folder structure, common npm commands, and any rules Claude should always follow when editing this codebase."},
        {label:"What goes in CLAUDE.md?",prompt:"What are the most important things to include in a CLAUDE.md file? Give me a prioritised list with examples of what each section should contain, and explain why each one helps Claude Code work better."},
      ],
      walkthrough:[
        "You create CLAUDE.md in your project root",
        "Claude Code reads it automatically on every run",
        "Claude knows your stack, conventions and commands upfront",
        "No need to re-explain context each session",
        "You update it as your project evolves",
        "Claude's output stays consistent with your standards",
      ],
    },
    nl:{ label:"CLAUDE.md", short:"Claude's persistente instructies",
      definition:"CLAUDE.md is een markdown-bestand in je projectmap dat Claude Code automatisch leest voor elke taak. Het definieert de regels, conventies en architectuurkeuzes van je project.",
      analogy:"Zoals een personeelshandboek voor een nieuwe medewerker. Voor hun eerste dag lezen ze het zodat ze al je processen, codestijl en ongeschreven regels kennen.",
      facts:[
        {k:"Locatie",v:"Projectroot: CLAUDE.md (of .claude/CLAUDE.md)"},
        {k:"Gelezen door",v:"Claude Code automatisch voor elke taak"},
        {k:"Bevat",v:"Architectuur, conventies, commando's, context"},
        {k:"Scope",v:"Projectspecifiek — verschilt per repo"},
      ],
      claudeGuide:{
        access:"Maak CLAUDE.md aan in de root van elk project waar Claude Code in werkt",
        example:"# Mijn Project\n\n## Stack\nNext.js 14, TypeScript, Tailwind\n\n## Conventies\n- Gebruik alleen functionele componenten\n- Alle API-aanroepen via /lib/api.ts\n- Commit nooit .env-bestanden\n\n## Veelgebruikte commando's\n- npm run dev (starten)\n- npm run test (jest)",
        steps:[
          "Maak een bestand CLAUDE.md aan in je projectroot",
          "Voeg secties toe: stack, conventies, commando's, architectuur",
          "Voer claude uit in die map — het leest CLAUDE.md automatisch",
          "Update het als je conventies veranderen",
        ],
        docsUrl:"https://docs.anthropic.com/claude-code",
      },
      copilotGuide:{
        access:"GitHub Copilot gebruikt .github/copilot-instructions.md",
        example:"CLAUDE.md is specifiek voor Claude Code. Voor Copilot gebruik je .github/copilot-instructions.md — zie dat concept voor details.",
        steps:[
          "CLAUDE.md wordt niet gelezen door GitHub Copilot",
          "Maak voor Copilot .github/copilot-instructions.md aan",
          "Beide bestanden dienen hetzelfde doel voor verschillende tools",
          "Je kunt beide bestanden in hetzelfde project bijhouden",
        ],
        docsUrl:"https://docs.github.com/copilot/customising",
      },
      scenarios:[
        {label:"Schrijf een CLAUDE.md",prompt:"Help me een CLAUDE.md-bestand schrijven voor een Next.js 14-project met TypeScript en Tailwind. Inclusief: stackoverzicht, coderingsconventies, mappenstructuur, veelgebruikte npm-commando's en regels die Claude altijd moet volgen."},
        {label:"Wat hoort er in CLAUDE.md?",prompt:"Wat zijn de belangrijkste dingen om op te nemen in een CLAUDE.md-bestand? Geef me een geprioriteerde lijst met voorbeelden van wat elke sectie moet bevatten."},
      ],
      walkthrough:[
        "Jij maakt CLAUDE.md aan in je projectroot",
        "Claude Code leest het automatisch bij elke uitvoering",
        "Claude kent je stack, conventies en commando's van tevoren",
        "Je hoeft de context niet elke sessie opnieuw uit te leggen",
        "Je werkt het bij als je project evolueert",
        "Claude's uitvoer blijft consistent met je standaarden",
      ],
    },
  },
  { id:"copilotmd", icon:"CP", color:"#60a5fa", x:64, y:76, related:["skills","agents","claudemd"],
    en:{ label:"copilot-instructions.md", short:"Copilot's persistent instructions",
      definition:".github/copilot-instructions.md is a file in your repository that GitHub Copilot reads automatically in every Copilot Chat session for that repo. It gives Copilot persistent knowledge of your coding conventions, preferred libraries, architectural patterns, and team rules — without you having to repeat them each time.",
      analogy:"Like a style guide pinned to every developer's desk. Whenever someone asks Copilot for help, it already has your team's rules in front of it and applies them automatically to every suggestion.",
      facts:[
        {k:"Location",v:".github/copilot-instructions.md in repo root"},
        {k:"Read by",v:"GitHub Copilot Chat automatically"},
        {k:"Contains",v:"Coding style, preferred libraries, patterns, rules"},
        {k:"Scope",v:"Repo-specific — apply per project"},
      ],
      claudeGuide:{
        access:"Claude Code uses CLAUDE.md instead — same purpose, different file",
        example:"copilot-instructions.md is GitHub Copilot-specific. For Claude Code, create CLAUDE.md in your project root — see that concept for details.",
        steps:[
          "copilot-instructions.md is not read by Claude Code",
          "For Claude Code, create CLAUDE.md instead",
          "Both files serve the same purpose for different AI tools",
          "You can maintain both in the same repo for different tools",
        ],
        docsUrl:"https://docs.anthropic.com/claude-code",
      },
      copilotGuide:{
        access:"Create .github/copilot-instructions.md in your repository",
        example:"# Coding conventions\n\n- Use TypeScript strict mode\n- Prefer named exports over default exports\n- Use React Query for data fetching\n- Write tests with Vitest\n- Follow Airbnb ESLint rules\n\n# Architecture\n- Feature-based folder structure\n- API layer in /services\n- Shared components in /ui",
        steps:[
          "Create .github/ folder in your repo root if it doesn't exist",
          "Create copilot-instructions.md inside it",
          "Write your conventions in plain markdown",
          "Open any file in VS Code — Copilot now follows your rules automatically",
        ],
        docsUrl:"https://docs.github.com/copilot/customising-copilot/adding-custom-instructions-for-github-copilot",
      },
      scenarios:[
        {label:"Write copilot-instructions.md",prompt:"Help me write a .github/copilot-instructions.md file for a React TypeScript project. Include: coding style rules, preferred libraries (React Query, Zustand, Zod), folder structure conventions, testing approach (Vitest + Testing Library), and any patterns Copilot should always use or avoid."},
        {label:"Instructions vs prompting",prompt:"What's the difference between writing instructions in copilot-instructions.md versus just telling Copilot what I want each time in the chat? When does a persistent instructions file give me a real advantage?"},
      ],
      walkthrough:[
        "You create .github/copilot-instructions.md in your repo",
        "Copilot reads it automatically in every Chat session",
        "Copilot applies your rules to every code suggestion",
        "No need to repeat conventions each conversation",
        "All teammates with Copilot benefit from the same rules",
        "Update the file as your conventions evolve",
      ],
    },
    nl:{ label:"copilot-instructions.md", short:"Copilot's persistente instructies",
      definition:".github/copilot-instructions.md is een bestand in je repository dat GitHub Copilot automatisch leest in elke Copilot Chat-sessie. Het geeft Copilot permanente kennis van je coderingsconventies en teamregels.",
      analogy:"Zoals een stijlgids op elk bureau. Wanneer iemand Copilot om hulp vraagt, heeft het al je teamregels voor zich en past ze automatisch toe.",
      facts:[
        {k:"Locatie",v:".github/copilot-instructions.md in repo-root"},
        {k:"Gelezen door",v:"GitHub Copilot Chat automatisch"},
        {k:"Bevat",v:"Codestijl, voorkeursbibliotheken, patronen, regels"},
        {k:"Scope",v:"Repo-specifiek — pas toe per project"},
      ],
      claudeGuide:{
        access:"Claude Code gebruikt CLAUDE.md — zelfde doel, ander bestand",
        example:"copilot-instructions.md is specifiek voor GitHub Copilot. Maak voor Claude Code CLAUDE.md aan in je projectroot.",
        steps:[
          "copilot-instructions.md wordt niet gelezen door Claude Code",
          "Maak voor Claude Code CLAUDE.md aan",
          "Beide bestanden dienen hetzelfde doel voor verschillende tools",
          "Je kunt beide bijhouden in hetzelfde project",
        ],
        docsUrl:"https://docs.anthropic.com/claude-code",
      },
      copilotGuide:{
        access:"Maak .github/copilot-instructions.md aan in je repository",
        example:"# Coderingsconventies\n\n- Gebruik TypeScript strict mode\n- Geef voorkeur aan named exports\n- Gebruik React Query voor data fetching\n- Schrijf tests met Vitest\n\n# Architectuur\n- Feature-gebaseerde mappenstructuur\n- API-laag in /services",
        steps:[
          "Maak .github/-map aan in je repo-root als die niet bestaat",
          "Maak copilot-instructions.md daarin aan",
          "Schrijf je conventies in gewone markdown",
          "Open een bestand in VS Code — Copilot volgt nu automatisch je regels",
        ],
        docsUrl:"https://docs.github.com/copilot/customising-copilot/adding-custom-instructions-for-github-copilot",
      },
      scenarios:[
        {label:"Schrijf copilot-instructions.md",prompt:"Help me een .github/copilot-instructions.md-bestand schrijven voor een React TypeScript-project. Inclusief: codestijlregels, voorkeursbibliotheken (React Query, Zustand, Zod), mappenstructuurconventies en testpatronen (Vitest + Testing Library)."},
        {label:"Instructies vs prompting",prompt:"Wat is het verschil tussen instructies schrijven in copilot-instructions.md versus elke keer in de chat vertellen wat ik wil? Wanneer geeft een persistent instructiebestand een echt voordeel?"},
      ],
      walkthrough:[
        "Jij maakt .github/copilot-instructions.md aan in je repo",
        "Copilot leest het automatisch in elke Chat-sessie",
        "Copilot past je regels toe op elke codeersuggestie",
        "Je hoeft conventies niet elke keer te herhalen",
        "Alle teamleden met Copilot profiteren van dezelfde regels",
        "Update het bestand als je conventies evolueren",
      ],
    },
  },
  { id:"prompts", icon:"PR", color:"#f472b6", x:50, y:50, related:["models","skills","claudemd","copilotmd","agents"],
    en:{ label:"Prompts", short:"How you talk to AI",
      definition:"A prompt is the instruction or question you give an AI model. It is the primary way you control what the AI does, how it responds, and how useful its output is. The quality of your prompt directly determines the quality of the result.",
      analogy:"Like giving directions to a taxi driver. Vague directions ('take me somewhere nice') get unpredictable results. Precise directions ('take me to the airport, Terminal 2, departures level') get exactly what you need.",
      facts:[
        {k:"Types",v:"System prompt (role/rules) + User prompt (task)"},
        {k:"Key elements",v:"Role, context, task, format, constraints"},
        {k:"Technique",v:"Be specific, give examples, define output format"},
        {k:"Iteration",v:"Prompting is a skill — refine until it works"},
      ],
      claudeGuide:{
        access:"Any Claude interface — claude.ai, API, or Claude Code",
        example:"Instead of: 'Summarise this' → Try: 'Summarise this legal contract in 5 bullet points. Focus on payment terms, termination clauses, and liability limits. Use plain English, no jargon.'",
        steps:[
          "Start with the role: 'You are a...' or 'Act as a...'",
          "Give context: what is this for, who is the audience",
          "State the task clearly and specifically",
          "Define the output format (bullets, JSON, table, length)",
          "Add constraints: tone, what to avoid, what to prioritise",
        ],
        docsUrl:"https://docs.anthropic.com/prompt-engineering",
      },
      copilotGuide:{
        access:"Copilot Chat in VS Code or github.com",
        example:"Instead of: 'Fix this' → Try: 'This function should return a sorted array of unique values. It currently has a bug where duplicates remain. Fix it and add a JSDoc comment explaining the parameters.'",
        steps:[
          "Reference specific files with #file: or @workspace",
          "Describe what the code should do, not just what's wrong",
          "Ask for explanations alongside code changes",
          "Use /explain, /fix, /tests slash commands as starting points",
          "Iterate — ask follow-up questions to refine the output",
        ],
        docsUrl:"https://docs.github.com/copilot/using-github-copilot/prompt-engineering-for-github-copilot",
      },
      scenarios:[
        {label:"Prompt anatomy",prompt:"Break down the anatomy of a great prompt. Show me a weak prompt vs a strong prompt for the same task (writing a product description), and explain exactly what makes the strong version better — element by element."},
        {label:"System vs user prompt",prompt:"Explain the difference between a system prompt and a user prompt in Claude's API. When would I use each? Show me a concrete example of both working together for a customer support chatbot."},
        {label:"Prompt for code",prompt:"I want to ask Claude to refactor a messy JavaScript function. Write me a well-structured prompt that will get the best result — include role, context, the task, output format requirements, and any constraints I should add."},
      ],
      walkthrough:[
        "You write a prompt describing what you need",
        "The model reads your role, context and task",
        "It uses your format instructions to structure output",
        "Constraints tell it what to avoid or prioritise",
        "You review the output and refine the prompt",
        "Better prompt → better output, every time",
      ],
    },
    nl:{ label:"Prompts", short:"Hoe je met AI praat",
      definition:"Een prompt is de instructie of vraag die je aan een AI-model geeft. Het is de primaire manier om te bepalen wat de AI doet, hoe het reageert en hoe nuttig de uitvoer is. De kwaliteit van je prompt bepaalt direct de kwaliteit van het resultaat.",
      analogy:"Zoals een taxichauffeur een bestemming geven. Vage instructies ('breng me ergens leuk naartoe') geven onvoorspelbare resultaten. Precieze instructies ('breng me naar Terminal 2, vertrekniveau') geven precies wat je nodig hebt.",
      facts:[
        {k:"Typen",v:"Systeemprompt (rol/regels) + Gebruikersprompt (taak)"},
        {k:"Sleutelelementen",v:"Rol, context, taak, opmaak, beperkingen"},
        {k:"Techniek",v:"Wees specifiek, geef voorbeelden, definieer uitvoerformaat"},
        {k:"Iteratie",v:"Prompting is een vaardigheid — verfijn totdat het werkt"},
      ],
      claudeGuide:{
        access:"Elke Claude-interface — claude.ai, API of Claude Code",
        example:"In plaats van: 'Vat dit samen' → Probeer: 'Vat dit juridisch contract samen in 5 bulletpoints. Focus op betalingsvoorwaarden, beëindigingsclausules en aansprakelijkheidslimieten. Gebruik gewone taal, geen jargon.'",
        steps:[
          "Begin met de rol: 'Je bent een...' of 'Handel als een...'",
          "Geef context: waarvoor is dit, wie is het publiek",
          "Beschrijf de taak duidelijk en specifiek",
          "Definieer het uitvoerformaat (bullets, JSON, tabel, lengte)",
          "Voeg beperkingen toe: toon, wat te vermijden, wat prioriteit heeft",
        ],
        docsUrl:"https://docs.anthropic.com/prompt-engineering",
      },
      copilotGuide:{
        access:"Copilot Chat in VS Code of github.com",
        example:"In plaats van: 'Fix dit' → Probeer: 'Deze functie moet een gesorteerde array van unieke waarden retourneren. Er zit een bug waardoor duplicaten blijven. Fix het en voeg een JSDoc-commentaar toe dat de parameters uitlegt.'",
        steps:[
          "Verwijs naar specifieke bestanden met #file: of @workspace",
          "Beschrijf wat de code moet doen, niet alleen wat er mis is",
          "Vraag om uitleg naast codewijzigingen",
          "Gebruik /explain, /fix, /tests slash-commando's als startpunt",
          "Itereer — stel vervolgvragen om de uitvoer te verfijnen",
        ],
        docsUrl:"https://docs.github.com/copilot/using-github-copilot/prompt-engineering-for-github-copilot",
      },
      scenarios:[
        {label:"Anatomie van een prompt",prompt:"Analyseer de anatomie van een goede prompt. Toon me een zwakke prompt versus een sterke prompt voor dezelfde taak (een productomschrijving schrijven), en leg precies uit wat de sterke versie beter maakt — element voor element."},
        {label:"Systeem vs gebruikersprompt",prompt:"Leg het verschil uit tussen een systeemprompt en een gebruikersprompt in Claude's API. Wanneer gebruik ik elk? Toon me een concreet voorbeeld van beide die samenwerken voor een klantenservice-chatbot."},
        {label:"Prompt voor code",prompt:"Ik wil Claude vragen om een rommelige JavaScript-functie te refactoren. Schrijf me een goed gestructureerde prompt die het beste resultaat geeft — inclusief rol, context, de taak, vereisten voor uitvoerformaat en beperkingen."},
      ],
      walkthrough:[
        "Jij schrijft een prompt die beschrijft wat je nodig hebt",
        "Het model leest je rol, context en taak",
        "Het gebruikt je opmaakinstucties om uitvoer te structureren",
        "Beperkingen vertellen het wat te vermijden of prioriteren",
        "Je beoordeelt de uitvoer en verfijnt de prompt",
        "Betere prompt → betere uitvoer, elke keer",
      ],
    },
  },
];

// ─── EDGES ───────────────────────────────────────────────────────────────────
const EDGES = [
  // Foundation → inputs
  ["models","tokens"], ["models","prompts"], ["models","agents"],
  // Inputs → agent capabilities
  ["prompts","agents"], ["prompts","skills"],
  ["agents","subagents"], ["agents","mcp"], ["agents","skills"], ["agents","coworkers"],
  // Agent capabilities → grounding
  ["skills","rag"], ["skills","references"],
  ["subagents","rag"],
  // Grounding → instruction files
  ["rag","claudemd"], ["references","claudemd"],
  // Instruction files
  ["claudemd","copilotmd"],
  ["claudemd","skills"], ["copilotmd","skills"],
];

// ─── TOOLS ───────────────────────────────────────────────────────────────────
const TOOLS = [
  {id:"claude",name:"Claude",platform:"claude",category:"General AI",complexity:"Beginner",tagline:"Conversational AI by Anthropic",concepts:["models","agents","rag"],url:"https://claude.ai",featured:true,steps:["Go to claude.ai","Create a free account","Start chatting immediately","Upgrade to Pro for more features"]},
  {id:"copilot",name:"GitHub Copilot",platform:"copilot",category:"Code",complexity:"Beginner",tagline:"AI pair programmer in VS Code",concepts:["models","skills","rag"],url:"https://github.com/features/copilot",featured:true,steps:["Install VS Code","Install GitHub Copilot extension","Sign in with GitHub","Start coding — suggestions appear automatically"]},
  {id:"claudecode",name:"Claude Code",platform:"claude",category:"Code",complexity:"Intermediate",tagline:"AI coding agent in your terminal",concepts:["agents","subagents","mcp","skills"],url:"https://docs.anthropic.com",featured:false,steps:["Install Node.js 18+","npm install -g @anthropic-ai/claude-code","Set ANTHROPIC_API_KEY","Run: claude in your project"]},
  {id:"n8n",name:"n8n",platform:"both",category:"Automation",complexity:"Intermediate",tagline:"Visual AI workflow automation",concepts:["agents","coworkers"],url:"https://n8n.io",featured:false,steps:["Sign up at n8n.io","Create a new workflow","Add an AI node","Connect to other apps"]},
  {id:"cursor",name:"Cursor",platform:"copilot",category:"Code",complexity:"Beginner",tagline:"AI-first code editor",concepts:["models","skills"],url:"https://cursor.sh",featured:false,steps:["Download from cursor.sh","Import VS Code settings","Code with AI inline","Ctrl+K to edit, Ctrl+L to chat"]},
  {id:"pinecone",name:"Pinecone",platform:"claude",category:"Vector DB",complexity:"Intermediate",tagline:"Vector database for RAG",concepts:["rag","references"],url:"https://pinecone.io",featured:false,steps:["Sign up at pinecone.io","Create a vector index","Upload embeddings via API","Query from your app"]},
];

// ─── EXAMPLE SECTION DATA ────────────────────────────────────────────────────
const EXAMPLE_CONCEPTS = [
  { id:"models", color:"#00D4FF", icon:"M",
    en:{ role:"The brain behind every step", contribution:"Claude Sonnet powers the orchestrator and each subagent. Different tasks may use different model settings — lower temperature for fact-checking, higher for creative writing.", prompt:"You are the orchestrator for a weekly AI newsletter system. Today is Monday.\n\nYour job:\n1. Assign the RESEARCH task to the Research Subagent\n2. Assign the WRITING task to the Writer Subagent\n3. Assign the FACT-CHECK task to the Checker Subagent\n4. Merge results into a final newsletter draft\n\nBegin by outlining the exact steps you would take and what you would pass to each subagent." },
    nl:{ role:"Het brein achter elke stap", contribution:"Claude Sonnet drijft de orchestrator en elke subagent aan. Verschillende taken gebruiken verschillende modelinstellingen — lagere temperatuur voor factchecking, hoger voor schrijven.", prompt:"Je bent de orchestrator voor een wekelijks AI-nieuwsbriefssysteem. Vandaag is het maandag.\n\nJouw taak:\n1. Wijs de ONDERZOEKS-taak toe aan de Onderzoeks-subagent\n2. Wijs de SCHRIJF-taak toe aan de Schrijver-subagent\n3. Wijs de FACTCHECK-taak toe aan de Checker-subagent\n4. Voeg resultaten samen tot een definitief concept\n\nBegin met het beschrijven van de exacte stappen die je zou nemen." },
  },
  { id:"agents", color:"#7C3AED", icon:"A",
    en:{ role:"The orchestrator — runs the whole show", contribution:"The top-level agent receives the goal 'produce this week's newsletter'. It decomposes the task, delegates to subagents, monitors outputs, and assembles the final result.", prompt:"Act as an AI orchestrator agent. You have received the goal: 'Produce this week's AI industry newsletter'.\n\nThink step by step:\n1. What subtasks do you need to delegate?\n2. What tools would you call? (web search, email sender, document writer)\n3. What do you do if a subagent returns low-quality output?\n4. How do you know when the task is complete?\n\nShow your full reasoning clearly." },
    nl:{ role:"De orchestrator — leidt het geheel", contribution:"De top-level agent ontvangt het doel 'produceer de nieuwsbrief van deze week'. Het splitst de taak op, delegeert aan subagents en stelt het eindresultaat samen.", prompt:"Handel als een AI-orchestratoragent. Je hebt het doel ontvangen: 'Produceer de AI-nieuwsbrief van deze week'.\n\nDenk stap voor stap:\n1. Welke deeltaken delegeer je?\n2. Welke tools roep je aan?\n3. Wat doe je als een subagent lage kwaliteit levert?\n4. Hoe weet je wanneer de taak klaar is?\n\nLaat je volledige redenering zien." },
  },
  { id:"subagents", color:"#10B981", icon:"S",
    en:{ role:"Three specialists working in parallel", contribution:"• Research Subagent: searches the web for AI news this week\n• Writer Subagent: turns research into newsletter copy using the skill\n• Fact-Check Subagent: verifies every claim against sources\n\nAll three run simultaneously, then the orchestrator merges their outputs.", prompt:"You are the Research Subagent in a newsletter system. Your only job is to find the 5 most important AI news stories from the past 7 days.\n\nFor each story provide:\n- Headline\n- 2-sentence summary\n- Source URL\n- Why it matters to AI practitioners\n\nBe concise and factual. Do not write newsletter copy — that is the Writer Subagent's job." },
    nl:{ role:"Drie specialisten die parallel werken", contribution:"• Onderzoeks-subagent: zoekt het web af naar AI-nieuws\n• Schrijver-subagent: zet onderzoek om naar nieuwsbriefstekst\n• Factcheck-subagent: verifieert elke bewering\n\nAlle drie werken tegelijk, dan voegt de orchestrator hun uitvoer samen.", prompt:"Je bent de Onderzoeks-subagent in een nieuwsbriefssysteem. Je enige taak is de 5 belangrijkste AI-nieuwsverhalen van de afgelopen 7 dagen vinden.\n\nGeef voor elk:\n- Koptekst\n- Samenvatting van 2 zinnen\n- Bron-URL\n- Waarom het belangrijk is\n\nWees bondig en feitelijk. Schrijf geen nieuwsbriefstekst — dat is het werk van de Schrijver-subagent." },
  },
  { id:"skills", color:"#F59E0B", icon:"SK",
    en:{ role:"The house style guide every agent follows", contribution:"A SKILL.md defines: newsletter tone (informative but conversational), structure (intro → 5 stories → closing), word count limits, and formatting rules. Every writing agent reads this file first. Output is consistent every week.", prompt:"Here is a SKILL.md for a newsletter writer agent:\n\n---\n# Newsletter Writing Skill\n\n## Tone\n- Informative but conversational\n- No jargon without explanation\n- Second person (\"you\")\n\n## Structure\n1. Hook (2 sentences)\n2. Five stories (150 words each)\n3. Closing insight (3 sentences)\n\n## Rules\n- No passive voice\n- Always cite sources inline\n- End each story with \"Why it matters:\"\n---\n\nNow use this skill to write one story about a recent AI development. Follow every rule exactly." },
    nl:{ role:"De huisstijlgids die elke agent volgt", contribution:"Een SKILL.md definieert: toon, structuur, woordlimiet en opmaakregels. Elke schrijvende agent leest dit bestand eerst. Uitvoer is elke week consistent.", prompt:"Hier is een SKILL.md voor een nieuwsbriefschrijver-agent:\n\n---\n# Nieuwsbrief Schrijf-skill\n\n## Toon\n- Informatief maar conversationeel\n- Geen jargon zonder uitleg\n- Tweede persoon (\"jij\")\n\n## Structuur\n1. Haak (2 zinnen)\n2. Vijf verhalen (150 woorden elk)\n3. Afsluitend inzicht (3 zinnen)\n\n## Regels\n- Geen lijdende vorm\n- Altijd bronnen citeren\n- Eindig elk verhaal met \"Waarom het belangrijk is:\"\n---\n\nGebruik nu deze skill om één verhaal te schrijven over een recente AI-ontwikkeling. Volg elke regel exact." },
  },
  { id:"rag", color:"#EC4899", icon:"R",
    en:{ role:"Your private knowledge base injected into context", contribution:"A vector database stores past newsletter issues, editorial guidelines, and subscriber feedback. Before writing, the Writer Subagent retrieves the most relevant past content to ensure this week's issue builds on — and never repeats — previous work.", prompt:"I'm simulating RAG for a newsletter system. Here is the retrieved context:\n\n[CHUNK 1] Last week's top story covered GPT-4o's multimodal updates.\n[CHUNK 2] Subscriber feedback: readers want more practical tutorials, fewer product announcements.\n[CHUNK 3] Editorial rule: never cover the same company twice in one issue.\n\nBased only on this retrieved context, write an introduction paragraph for this week's newsletter. Apply all three retrieved guidelines visibly." },
    nl:{ role:"Je privékennisbank in de context ingevoegd", contribution:"Een vectordatabase slaat eerdere nieuwsbriefedities, redactionele richtlijnen en abonneefeedback op. Voor het schrijven haalt de Schrijver-subagent de meest relevante eerdere content op.", prompt:"Ik simuleer RAG voor een nieuwsbriefssysteem. Hier is de opgehaalde context:\n\n[STUK 1] Het topverhaal van vorige week behandelde GPT-4o's multimodale updates.\n[STUK 2] Abonneefeedback: lezers willen meer praktische tutorials, minder productaankondigingen.\n[STUK 3] Redactionele regel: behandel nooit twee keer hetzelfde bedrijf in één editie.\n\nSchrijf op basis van deze opgehaalde context een inleidingsparagraaf. Pas alle drie richtlijnen zichtbaar toe." },
  },
  { id:"references", color:"#6366F1", icon:"Rf",
    en:{ role:"Proof that every claim is real", contribution:"The Fact-Check Subagent verifies each story against its source URL. Every claim in the final newsletter is tagged with a citation. Hallucinations are caught before sending.", prompt:"You are the Fact-Check Subagent. Here is a draft newsletter story:\n\n\"OpenAI released GPT-5 last Tuesday, claiming it scores 95% on the MMLU benchmark, making it the highest-scoring model ever tested. The model is available free to all users.\"\n\nYour job: identify every factual claim, rate each as VERIFIED / UNVERIFIED / LIKELY FALSE, and explain exactly what a fact-checker would need to verify each one. Be precise." },
    nl:{ role:"Bewijs dat elke bewering echt is", contribution:"De Factcheck-subagent verifieert elk verhaal aan de hand van de bron-URL. Elke bewering in de uiteindelijke nieuwsbrief krijgt een citatie. Hallucinaties worden gevangen voordat ze verstuurd worden.", prompt:"Je bent de Factcheck-subagent. Hier is een concept nieuwsbriefverhaal:\n\n\"OpenAI heeft GPT-5 afgelopen dinsdag uitgebracht en beweert dat het 95% scoort op de MMLU-benchmark. Het model is gratis beschikbaar voor alle gebruikers.\"\n\nJouw taak: identificeer elke feitelijke bewering, beoordeel elk als GEVERIFIEERD / NIET GEVERIFIEERD / WAARSCHIJNLIJK ONJUIST, en leg uit wat een factchecker nodig heeft om elk te verifiëren." },
  },
  { id:"mcp", color:"#14B8A6", icon:"MC",
    en:{ role:"The connectors that give agents real tools", contribution:"MCP servers extend what agents can actually do:\n• Web Search MCP → Research Subagent searches live news\n• Email MCP → Orchestrator sends the finished newsletter\n• Google Docs MCP → Draft saved for human review\n• Calendar MCP → Scheduled every Monday at 7am", prompt:"Explain what happens technically when the newsletter agent uses a Web Search MCP server to find AI news.\n\nStep by step:\n1. How the agent discovers the web_search tool is available\n2. What the tool call looks like (show an example JSON)\n3. What the MCP server does with that call\n4. How the result comes back to the agent\n5. What happens next in the newsletter flow\n\nKeep it concrete and show real examples." },
    nl:{ role:"De connectoren die agents echte tools geven", contribution:"MCP-servers breiden uit wat agents werkelijk kunnen:\n• Web Zoeken MCP → Onderzoeks-subagent zoekt live nieuws\n• E-mail MCP → Orchestrator verstuurt de nieuwsbrief\n• Google Docs MCP → Concept opgeslagen voor beoordeling\n• Agenda MCP → Gepland elke maandag om 7u", prompt:"Leg uit wat er technisch gebeurt wanneer de nieuwsbrief-agent een Web Zoeken MCP-server gebruikt.\n\nStap voor stap:\n1. Hoe de agent ontdekt dat de web_search tool beschikbaar is\n2. Hoe de tool-aanroep eruitziet (toon een voorbeeld JSON)\n3. Wat de MCP-server doet met die aanroep\n4. Hoe het resultaat terugkomt bij de agent\n5. Wat er daarna gebeurt in de nieuwsbrief-stroom" },
  },
  { id:"tokens", color:"#FF6B35", icon:"T",
    en:{ role:"The budget that shapes every decision", contribution:"The orchestrator must stay within Claude's 200K context window. It uses compressed summaries (~500 tokens each) instead of raw full-text research, keeping total context under 50K tokens even for large research batches.", prompt:"Design the token budget for a newsletter agent system with a 200K context window.\n\nThe system has:\n- 5 news stories (avg 800 words each) = ~6,000 tokens\n- Past newsletter examples for style reference = ~4,000 tokens\n- RAG chunks from knowledge base = ~3,000 tokens\n- System prompt + skill instructions = ~1,500 tokens\n- Writing and fact-check outputs = ~2,000 tokens\n\nCalculate: total tokens used, % of context window, and recommend a compression strategy if it approaches the limit." },
    nl:{ role:"Het budget dat elke beslissing vormt", contribution:"De orchestrator moet binnen het 200K contextvenster van Claude blijven. Het gebruikt gecomprimeerde samenvattingen (~500 tokens elk) in plaats van volledige ruwe research.", prompt:"Ontwerp het tokenbudget voor een nieuwsbrief-agentsysteem met een contextvenster van 200K.\n\nHet systeem heeft:\n- 5 nieuwsverhalen (gemiddeld 800 woorden) = ~6.000 tokens\n- Eerdere nieuwsbriefvoorbeelden = ~4.000 tokens\n- RAG-stukken = ~3.000 tokens\n- Systeemprompt + skill-instructies = ~1.500 tokens\n- Schrijf- en factcheck-uitvoer = ~2.000 tokens\n\nBereken: totaal tokens, % van contextvenster, en stel een compressiestrategie voor." },
  },
  { id:"prompt_concept", color:"#a78bfa", icon:"P",
    en:{ role:"The instructions that shape every output", contribution:"Every agent call starts with a carefully crafted system prompt. The orchestrator's prompt defines its role, constraints, and output format. Each subagent has its own focused prompt. Good prompts mean reliable, structured outputs that chain cleanly.", prompt:"Two system prompts for a newsletter Research Subagent. Which is better and why?\n\nPROMPT A:\n\"You are a helpful assistant. Find some news about AI and summarise it.\"\n\nPROMPT B:\n\"You are the Research Subagent for a weekly AI newsletter. Task: find exactly 5 AI news stories published in the last 7 days. For each, return: headline, 2-sentence summary, source URL, and a 'Why it matters' sentence. Return as a JSON array. No opinion or editorial commentary.\"\n\nList 5 specific improvements Prompt B makes and explain why each matters for an automated pipeline." },
    nl:{ role:"De instructies die elke uitvoer vormen", contribution:"Elke agentaanroep begint met een zorgvuldig opgestelde systeemprompt. De orchestratorprompt definieert rol, beperkingen en uitvoerformaat. Goede prompts = betrouwbare uitvoer die netjes aan elkaar ketent.", prompt:"Twee systeemprompts voor een nieuwsbrief-Onderzoeks-subagent. Welke is beter en waarom?\n\nPROMPT A:\n\"Je bent een behulpzame assistent. Zoek wat nieuws over AI en vat het samen.\"\n\nPROMPT B:\n\"Je bent de Onderzoeks-subagent voor een wekelijkse AI-nieuwsbrief. Taak: vind precies 5 AI-nieuwsverhalen gepubliceerd in de afgelopen 7 dagen. Geef voor elk: koptekst, samenvatting van 2 zinnen, bron-URL en een 'Waarom het belangrijk is'-zin. Geef terug als JSON-array. Geen mening.\"\n\nNoem 5 specifieke verbeteringen die Prompt B maakt en leg uit waarom elk belangrijk is." },
  },
  { id:"workflow_concept", color:"#34d399", icon:"W",
    en:{ role:"The glue that sequences everything", contribution:"A workflow tool (like n8n) schedules and sequences the whole system. It triggers every Monday at 7am, calls the orchestrator, routes outputs between agents, handles errors, and sends the final newsletter. The AI does the thinking; the workflow does the plumbing.", prompt:"Design a complete n8n workflow for the weekly newsletter system. Describe each node:\n\n1. What triggers the workflow (day/time)\n2. How it calls the AI orchestrator\n3. How it passes research → writer → fact-checker\n4. What happens if the AI returns an error\n5. How the final newsletter gets emailed to subscribers\n6. How the team gets notified for human review before sending\n\nName the specific n8n nodes you'd use for each step." },
    nl:{ role:"De lijm die alles aan elkaar koppelt", contribution:"Een workflow-tool (zoals n8n) plant en ordent het hele systeem. Het triggert elke maandag om 7u, roept de orchestrator aan, stuurt uitvoer tussen agents, verwerkt fouten en verstuurt de nieuwsbrief.", prompt:"Ontwerp een compleet n8n-workflow voor het wekelijkse nieuwsbriefssysteem. Beschrijf elk knooppunt:\n\n1. Wat de workflow triggert\n2. Hoe het de AI-orchestrator aanroept\n3. Hoe het onderzoek → schrijver → factchecker doorgeeft\n4. Wat er gebeurt bij een AI-fout\n5. Hoe de nieuwsbrief wordt verstuurd\n6. Hoe het team een melding krijgt voor beoordeling\n\nNoem de specifieke n8n-knooppunten voor elke stap." },
  },
];

// ─── EXTRA EXAMPLES ──────────────────────────────────────────────────────────
const EXAMPLE_CODE_REVIEWER = {
  id: "codereviewer",
  conceptsUsed: ["models","prompts","skills","copilotmd","references"],
  en: {
    scenario: "Every time a pull request is opened on GitHub, an AI automatically reviews the code for bugs, style issues, and security problems — and posts a structured comment with actionable feedback.",
    howItFits: [
      { id:"models",    role:"The review engine", contribution:"Claude Sonnet reads the diff and generates a structured review. A focused model with low temperature ensures consistent, reliable output." },
      { id:"prompts",   role:"The review instructions", contribution:"A carefully written system prompt defines exactly what to look for: security issues first, then logic bugs, then style. The prompt enforces a consistent output format every time." },
      { id:"skills",    role:"Your review standards", contribution:"A SKILL.md encodes your team's specific rules — naming conventions, forbidden patterns, required test coverage — so the AI reviews against your actual standards, not generic ones." },
      { id:"copilotmd", role:"Editor-side awareness", contribution:"copilot-instructions.md tells Copilot about the same conventions, so suggestions in the editor already match what the reviewer will accept. Fewer review comments before they happen." },
      { id:"references",role:"Cited feedback", contribution:"Every comment the AI posts links to the specific line it references, making feedback easy to trace and act on." },
    ],
    flow: [
      { en:"PR opened → GitHub webhook fires", color:"#34d399", icon:"W" },
      { en:"Model reads the diff with your system prompt", color:"#00D4FF", icon:"M" },
      { en:"Skills file loads your team's coding rules", color:"#F59E0B", icon:"SK" },
      { en:"AI reviews: security → logic → style", color:"#7C3AED", icon:"A" },
      { en:"Structured review posted as PR comment with references", color:"#6366F1", icon:"Rf" },
    ],
    outcomes: [
      "Every PR gets a consistent first review in seconds",
      "Your team's specific standards are enforced automatically",
      "Reviewers focus on architecture, not style nitpicks",
      "No RAG, no agents, no MCP needed — just model + prompts + skills",
    ],
    tryConceptId: "prompts",
    tryPrompt: "Help me write a system prompt for an AI code reviewer. It should: review security issues first, then logic bugs, then style. Output a structured markdown comment. Our stack is TypeScript + React. Be concise and actionable.",
  },
  nl: {
    scenario: "Elke keer dat een pull request wordt geopend op GitHub, reviewt een AI automatisch de code op bugs, stijlproblemen en beveiligingskwesties — en plaatst een gestructureerd commentaar met concrete feedback.",
    howItFits: [
      { id:"models",    role:"De review-engine", contribution:"Claude Sonnet leest de diff en genereert een gestructureerde review. Een gefocust model met lage temperatuur zorgt voor consistente, betrouwbare uitvoer." },
      { id:"prompts",   role:"De review-instructies", contribution:"Een zorgvuldig geschreven systeemprompt definieert precies wat te controleren: eerst beveiligingsproblemen, dan logicabugs, dan stijl. De prompt dwingt een consistent uitvoerformaat af." },
      { id:"skills",    role:"Jouw reviewstandaarden", contribution:"Een SKILL.md legt de specifieke regels van jouw team vast — naamconventies, verboden patronen, vereiste testdekking — zodat de AI reviewt op basis van jouw standaarden." },
      { id:"copilotmd", role:"Bewustzijn aan de editorskant", contribution:"copilot-instructions.md vertelt Copilot over dezelfde conventies, zodat suggesties in de editor al overeenkomen met wat de reviewer zal accepteren." },
      { id:"references",role:"Geciteerde feedback", contribution:"Elk commentaar dat de AI plaatst verwijst naar de specifieke regel, waardoor feedback gemakkelijk te traceren en uit te voeren is." },
    ],
    flow: [
      { en:"PR geopend → GitHub webhook triggert", color:"#34d399", icon:"W" },
      { en:"Model leest de diff met je systeemprompt", color:"#00D4FF", icon:"M" },
      { en:"Skills-bestand laadt je teamregels", color:"#F59E0B", icon:"SK" },
      { en:"AI reviewt: beveiliging → logica → stijl", color:"#7C3AED", icon:"A" },
      { en:"Gestructureerde review geplaatst als PR-commentaar", color:"#6366F1", icon:"Rf" },
    ],
    outcomes: [
      "Elke PR krijgt binnen seconden een consistente eerste review",
      "De specifieke standaarden van je team worden automatisch gehandhaafd",
      "Reviewers focussen op architectuur, niet op stijlkritiek",
      "Geen RAG, geen agents, geen MCP nodig — alleen model + prompts + skills",
    ],
    tryConceptId: "prompts",
    tryPrompt: "Help me een systeemprompt schrijven voor een AI-codereviewer. Het moet: eerst beveiligingsproblemen reviewen, dan logicabugs, dan stijl. Uitvoer als gestructureerd markdown-commentaar. Onze stack is TypeScript + React. Wees beknopt en concreet.",
  },
};

const EXAMPLE_BUG_FIXER = {
  id: "bugfixer",
  conceptsUsed: ["models","agents","prompts","skills","rag","claudemd"],
  en: {
    scenario: "A developer describes a bug in plain language. An AI agent investigates — reads the relevant code, checks past bug reports, proposes a fix, writes a test, and opens a draft PR — all without the developer leaving the chat.",
    howItFits: [
      { id:"models",   role:"The reasoning brain", contribution:"Claude Sonnet reasons through the bug, understands code context, and generates the fix. The model's long context window lets it read multiple files at once." },
      { id:"agents",   role:"The investigator", contribution:"The agent doesn't just answer — it acts. It reads files, searches for related code, proposes a fix, writes a test, and creates a PR. Each step uses the result of the previous one." },
      { id:"prompts",  role:"The investigation brief", contribution:"The system prompt defines the agent's role: 'You are a senior engineer. Investigate methodically. Always write a test before proposing a fix.' This shapes every decision the agent makes." },
      { id:"skills",   role:"Your coding conventions", contribution:"A SKILL.md tells the agent your test framework, file structure, naming rules and patterns — so the fix it writes fits your codebase, not a generic one." },
      { id:"rag",      role:"Past bug knowledge", contribution:"A vector database of past bug reports and resolved issues helps the agent recognise patterns: 'This looks like the null pointer issue from issue #412.' Avoids reinventing solutions." },
      { id:"claudemd", role:"Project awareness", contribution:"CLAUDE.md tells the agent which files to look at first, which are off-limits, and what commands to run to verify the fix — saving multiple back-and-forth turns." },
    ],
    flow: [
      { en:"Developer describes bug in plain language", color:"#f472b6", icon:"PR" },
      { en:"Agent reads CLAUDE.md — learns project structure", color:"#c084fc", icon:"CL" },
      { en:"RAG searches past bug reports for similar issues", color:"#EC4899", icon:"R" },
      { en:"Agent reads relevant files, traces the bug", color:"#7C3AED", icon:"A" },
      { en:"Skills file loads — agent writes fix in your style", color:"#F59E0B", icon:"SK" },
      { en:"Agent writes test, verifies, opens draft PR", color:"#10B981", icon:"S" },
    ],
    outcomes: [
      "Bug investigation is done in minutes, not hours",
      "Fix already includes a test — fewer regressions",
      "Agent knows your codebase via CLAUDE.md and skills",
      "RAG prevents re-solving the same bug twice",
      "Developer reviews a draft PR, not a blank editor",
    ],
    tryConceptId: "agents",
    tryPrompt: "Act as an AI bug-fixing agent. I have a bug: a React component re-renders infinitely when a parent state changes. Walk me through how you would: 1) investigate the cause, 2) propose a fix, 3) write a test for it. Think step by step like a senior engineer.",
  },
  nl: {
    scenario: "Een ontwikkelaar beschrijft een bug in gewone taal. Een AI-agent onderzoekt — leest de relevante code, controleert eerdere bugrapporten, stelt een oplossing voor, schrijft een test en opent een concept-PR — zonder dat de ontwikkelaar de chat verlaat.",
    howItFits: [
      { id:"models",   role:"Het redenerende brein", contribution:"Claude Sonnet redeneert door de bug, begrijpt de codecontext en genereert de oplossing. Het grote contextvenster laat het meerdere bestanden tegelijk lezen." },
      { id:"agents",   role:"De onderzoeker", contribution:"De agent geeft niet alleen antwoord — hij handelt. Hij leest bestanden, zoekt gerelateerde code, stelt een oplossing voor, schrijft een test en maakt een PR." },
      { id:"prompts",  role:"De onderzoeksopdracht", contribution:"De systeemprompt definieert de rol van de agent: 'Je bent een senior engineer. Onderzoek methodisch. Schrijf altijd een test voor je een oplossing voorstelt.'" },
      { id:"skills",   role:"Jouw coderingsconventies", contribution:"Een SKILL.md vertelt de agent je testframework, bestandsstructuur en naamregels — zodat de oplossing past bij jouw codebase." },
      { id:"rag",      role:"Kennis van eerdere bugs", contribution:"Een vectordatabase met eerdere bugrapporten helpt de agent patronen te herkennen: 'Dit lijkt op de null pointer-kwestie van issue #412.'" },
      { id:"claudemd", role:"Projectbewustzijn", contribution:"CLAUDE.md vertelt de agent welke bestanden eerst te bekijken, welke verboden zijn, en welke commando's te gebruiken om de oplossing te verifiëren." },
    ],
    flow: [
      { en:"Ontwikkelaar beschrijft bug in gewone taal", color:"#f472b6", icon:"PR" },
      { en:"Agent leest CLAUDE.md — leert projectstructuur", color:"#c084fc", icon:"CL" },
      { en:"RAG zoekt eerdere bugrapporten op", color:"#EC4899", icon:"R" },
      { en:"Agent leest relevante bestanden, traceert de bug", color:"#7C3AED", icon:"A" },
      { en:"Skills-bestand laadt — agent schrijft oplossing in jouw stijl", color:"#F59E0B", icon:"SK" },
      { en:"Agent schrijft test, verifieert, opent concept-PR", color:"#10B981", icon:"S" },
    ],
    outcomes: [
      "Bugonderzoek klaar in minuten, niet uren",
      "Oplossing bevat al een test — minder regressies",
      "Agent kent jouw codebase via CLAUDE.md en skills",
      "RAG voorkomt dat dezelfde bug twee keer opgelost wordt",
      "Ontwikkelaar beoordeelt een concept-PR, geen lege editor",
    ],
    tryConceptId: "agents",
    tryPrompt: "Handel als een AI bug-fixing agent. Ik heb een bug: een React-component re-rendert oneindig wanneer een parent-state verandert. Loop stap voor stap door hoe je: 1) de oorzaak onderzoekt, 2) een oplossing voorstelt, 3) een test schrijft. Denk als een senior engineer.",
  },
};

const EXAMPLE_COMMIT_WRITER = {
  id: "commitwriter",
  conceptsUsed: ["models","prompts","skills"],
  en: {
    scenario: "A developer stages their changes and runs one command. The AI reads the diff, applies your team's commit message conventions, and writes a clear, structured commit message — ready to use in seconds.",
    howItFits: [
      { id:"models",  role:"Reads the diff, writes the message", contribution:"Claude Sonnet reads your staged diff and generates a commit message. That's all it needs to do — no tools, no loops, just one focused generation task." },
      { id:"prompts", role:"Defines the commit format", contribution:"Your system prompt specifies the format: Conventional Commits, a max subject length, when to add a body, and what to never include. The prompt is the entire logic of the tool." },
      { id:"skills",  role:"Your team's commit rules", contribution:"A SKILL.md encodes your specific conventions — your prefix list (feat, fix, chore, docs…), your ticket reference format, your preferred tense — so every message fits your repo's history perfectly." },
    ],
    flow: [
      { en:"Developer runs: git diff --staged | ask-ai", color:"#f472b6", icon:"PR" },
      { en:"Model receives the diff + your system prompt", color:"#00D4FF", icon:"M" },
      { en:"Skills file loads your commit conventions", color:"#F59E0B", icon:"SK" },
      { en:"Model writes a structured commit message", color:"#00D4FF", icon:"M" },
      { en:"Developer copies, reviews, commits", color:"#10B981", icon:"+" },
    ],
    outcomes: [
      "Consistent commit history across the whole team",
      "No agents, no RAG, no MCP — just 3 concepts",
      "Setup takes under 30 minutes",
      "Works from the terminal, VS Code, or any editor",
    ],
    tryConceptId: "prompts",
    tryPrompt: "Write a system prompt for an AI commit message writer. Rules: use Conventional Commits format (feat/fix/chore/docs/refactor), max 72 chars subject line, imperative mood, no period at the end, add a body only if the change is complex. The AI receives a git diff as input.",
  },
  nl: {
    scenario: "Een ontwikkelaar staged zijn wijzigingen en voert één commando uit. De AI leest de diff, past de commit-conventies van je team toe en schrijft een duidelijke, gestructureerde commit-boodschap — klaar in seconden.",
    howItFits: [
      { id:"models",  role:"Leest de diff, schrijft de boodschap", contribution:"Claude Sonnet leest je gestagede diff en genereert een commit-boodschap. Dat is alles wat het hoeft te doen — geen tools, geen lussen, gewoon één gerichte generatietaak." },
      { id:"prompts", role:"Definieert het commit-formaat", contribution:"Je systeemprompt specificeert het formaat: Conventional Commits, maximale onderwerplengte, wanneer een body toe te voegen, en wat nooit op te nemen. De prompt is de volledige logica van de tool." },
      { id:"skills",  role:"De commit-regels van je team", contribution:"Een SKILL.md legt je specifieke conventies vast — je prefix-lijst (feat, fix, chore, docs…), je ticket-referentieformaat, je voorkeurstempus — zodat elke boodschap perfect past bij de geschiedenis van je repo." },
    ],
    flow: [
      { en:"Ontwikkelaar voert uit: git diff --staged | ask-ai", color:"#f472b6", icon:"PR" },
      { en:"Model ontvangt de diff + je systeemprompt", color:"#00D4FF", icon:"M" },
      { en:"Skills-bestand laadt je commit-conventies", color:"#F59E0B", icon:"SK" },
      { en:"Model schrijft een gestructureerde commit-boodschap", color:"#00D4FF", icon:"M" },
      { en:"Ontwikkelaar kopieert, beoordeelt, commit", color:"#10B981", icon:"+" },
    ],
    outcomes: [
      "Consistente commit-geschiedenis voor het hele team",
      "Geen agents, geen RAG, geen MCP — slechts 3 concepten",
      "Setup duurt minder dan 30 minuten",
      "Werkt vanuit de terminal, VS Code of elke editor",
    ],
    tryConceptId: "prompts",
    tryPrompt: "Schrijf een systeemprompt voor een AI commit-boodschapschrijver. Regels: gebruik Conventional Commits-formaat (feat/fix/chore/docs/refactor), max 72 tekens onderwerpregel, gebiedende wijs, geen punt aan het einde, voeg alleen een body toe als de wijziging complex is. De AI ontvangt een git diff als invoer.",
  },
};

const FLOW_STEPS = [
  { en:"Monday 7am — Workflow triggers", nl:"Maandag 7u — Workflow triggert", icon:"W", color:"#34d399" },
  { en:"Orchestrator Agent receives goal: write newsletter", nl:"Orchestrator Agent ontvangt doel: schrijf nieuwsbrief", icon:"A", color:"#7C3AED" },
  { en:"MCP servers activated (Web Search, Docs, Email)", nl:"MCP-servers geactiveerd (Zoeken, Docs, E-mail)", icon:"MC", color:"#14B8A6" },
  { en:"3 Subagents spawn and work in parallel", nl:"3 Subagents starten en werken parallel", icon:"S", color:"#10B981" },
  { en:"Research Subagent calls Web Search MCP → finds 5 stories", nl:"Onderzoeks-subagent roept Web Zoeken MCP aan → vindt 5 verhalen", icon:"R", color:"#EC4899" },
  { en:"RAG retrieves past issues + editorial guidelines from vector DB", nl:"RAG haalt eerdere edities + redactieregels op uit vectordatabase", icon:"R", color:"#EC4899" },
  { en:"Writer Subagent reads Skills file → writes draft using retrieved context", nl:"Schrijver-subagent leest Skills-bestand → schrijft concept met opgehaalde context", icon:"SK", color:"#F59E0B" },
  { en:"Fact-Check Subagent verifies all claims → attaches References", nl:"Factcheck-subagent verifieert alle beweringen → voegt Referenties toe", icon:"Rf", color:"#6366F1" },
  { en:"Orchestrator merges outputs — respects Token budget", nl:"Orchestrator voegt uitvoer samen — respecteert Tokenbudget", icon:"T", color:"#FF6B35" },
  { en:"Prompt shapes final formatting and tone pass", nl:"Prompt verzorgt definitieve opmaak en toon", icon:"P", color:"#a78bfa" },
  { en:"Workflow sends draft to team for human review", nl:"Workflow stuurt concept naar team voor menselijke beoordeling", icon:"W", color:"#34d399" },
  { en:"Approved → Email MCP sends newsletter to subscribers", nl:"Goedgekeurd → E-mail MCP verstuurt nieuwsbrief naar abonnees", icon:"MC", color:"#14B8A6" },
];

// ─── STYLES ──────────────────────────────────────────────────────────────────
const css = `
@import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Playfair+Display:wght@400;700&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
:root{--bg:#08090d;--s1:#0f1117;--s2:#161b24;--b1:#1a2030;--b2:#242e40;--t1:#dde6f0;--t2:#7a8a9e;--t3:#3a4558;--fd:'Playfair Display',Georgia,serif;--fm:'DM Mono',monospace;--r:10px;--tr:.18s ease;}
body,#root{font-family:var(--fm);background:var(--bg);color:var(--t1);height:100vh;}
.app{display:flex;flex-direction:column;height:100vh;overflow:hidden;background:var(--bg);}
/* ── Header (title + toggles) ── */
.header{flex-shrink:0;height:48px;background:var(--s1);border-bottom:1px solid var(--b1);display:flex;align-items:center;padding:0 18px;gap:12px;}
.header-brand{flex:1;min-width:0;overflow:hidden;}
.header-brand h1{font-family:var(--fd);font-size:1rem;font-weight:700;color:var(--t1);line-height:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.header-brand p{font-size:.5rem;color:var(--t3);margin-top:1px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.header-right{display:flex;align-items:center;gap:8px;flex-shrink:0;}
.tg-lbl{font-size:.52rem;color:var(--t3);}
.tg{display:flex;border-radius:5px;overflow:hidden;border:1px solid var(--b2);background:var(--bg);}
.tb{padding:4px 10px;background:transparent;border:none;color:var(--t2);font-family:var(--fm);font-size:.63rem;cursor:pointer;transition:all var(--tr);}
.tb.on{background:var(--s2);color:var(--t1);}
/* ── Main content ── */
.main{flex:1;overflow-y:auto;padding-bottom:4px;}
/* ── Bottom tab bar ── */
.bottomnav{flex-shrink:0;height:58px;background:var(--s1);border-top:1px solid var(--b1);display:flex;align-items:stretch;}
.ni{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;cursor:pointer;font-size:.6rem;color:var(--t3);transition:all var(--tr);padding:6px 4px;border:none;background:none;font-family:var(--fm);}
.ni:hover{color:var(--t2);}
.ni.on{color:var(--t1);}
.ni-icon{font-size:1.6rem;line-height:1;}
.ni-bar{position:absolute;top:0;left:20%;right:20%;height:2px;background:var(--c,var(--t1));border-radius:0 0 2px 2px;opacity:0;transition:opacity var(--tr);}
.ni{position:relative;}
.ni.on .ni-bar{opacity:1;}
.sh{padding:20px 24px 13px;border-bottom:1px solid var(--b1);margin-bottom:20px;}
.sh h2{font-family:var(--fd);font-size:1.5rem;font-weight:700;color:var(--t1);}
.sh p{color:var(--t2);font-size:.7rem;margin-top:4px;line-height:1.5;}
/* MAP */
.mwrap{padding:12px 24px 24px;}
.msvg{background:var(--s1);border:1px solid var(--b1);border-radius:var(--r);width:100%;display:block;}
/* GRID */
.cgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(185px,1fr));gap:10px;padding:0 24px 24px;}
.cc{background:var(--s1);border:1px solid var(--b1);border-radius:var(--r);padding:14px;cursor:pointer;transition:all var(--tr);position:relative;overflow:hidden;}
.cc::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:var(--c,#fff);opacity:.4;transition:opacity var(--tr);}
.cc:hover{border-color:var(--b2);transform:translateY(-1px);}
.cc:hover::before{opacity:1;}
.cc-icon{font-size:.58rem;font-weight:700;padding:2px 5px;border-radius:3px;display:inline-block;margin-bottom:8px;border:1px solid currentColor;}
.cc-label{font-family:var(--fd);font-size:.9rem;font-weight:700;margin-bottom:2px;}
.cc-short{font-size:.63rem;color:var(--t2);}
/* DETAIL */
.cd{padding:0 24px 32px;}
.back{background:none;border:none;font-family:var(--fm);font-size:.66rem;color:var(--t3);cursor:pointer;margin-bottom:14px;display:block;transition:color var(--tr);}
.back:hover{color:var(--t2);}
.dh{display:flex;align-items:flex-start;gap:12px;margin-bottom:20px;}
.dh-ic{width:44px;height:44px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:.58rem;font-weight:700;flex-shrink:0;border:1px solid var(--b2);}
.dh h2{font-family:var(--fd);font-size:1.5rem;font-weight:700;line-height:1.05;}
.dh .dsub{color:var(--t2);font-size:.68rem;margin-top:2px;}
.dgrid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:13px;}
.dc{background:var(--s1);border:1px solid var(--b1);border-radius:var(--r);padding:13px;}
.dc h4{font-size:.56rem;text-transform:uppercase;letter-spacing:.1em;color:var(--t3);margin-bottom:7px;}
.dc p{font-size:.69rem;line-height:1.65;color:var(--t2);}
.fl{list-style:none;}
.fl li{display:flex;gap:7px;font-size:.68rem;padding:5px 0;border-bottom:1px solid var(--b1);color:var(--t2);}
.fl li:last-child{border-bottom:none;}
.fk{color:var(--t3);min-width:65px;flex-shrink:0;font-size:.64rem;}
.wt{background:var(--s1);border:1px solid var(--b1);border-radius:var(--r);padding:13px;margin-bottom:13px;}
.wt h4{font-size:.56rem;text-transform:uppercase;letter-spacing:.1em;color:var(--t3);margin-bottom:10px;}
.wts-item{display:flex;align-items:flex-start;gap:9px;padding:7px 0;border-bottom:1px solid var(--b1);opacity:.28;transition:opacity .4s;}
.wts-item:last-child{border-bottom:none;}
.wts-item.on{opacity:1;}
.wn{width:18px;height:18px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.58rem;flex-shrink:0;border:1px solid var(--b2);color:var(--t3);}
.wts-item.on .wn{border-color:var(--c,#fff);color:var(--c,#fff);}
.wtext{font-size:.68rem;color:var(--t2);padding-top:1px;line-height:1.5;}
.wctrl{display:flex;gap:5px;margin-top:10px;}
.uw{background:var(--s1);border:1px solid var(--b1);border-radius:var(--r);overflow:hidden;margin-bottom:13px;}
.uw-head{display:flex;border-bottom:1px solid var(--b1);}
.uwt{padding:8px 13px;cursor:pointer;font-size:.66rem;color:var(--t3);border-bottom:2px solid transparent;background:none;border-top:none;border-left:none;border-right:none;font-family:var(--fm);transition:all var(--tr);}
.uwt.on{color:var(--t1);border-bottom-color:var(--c,#fff);}
.uw-body{padding:13px;}
.uw-acc{font-size:.62rem;color:var(--t3);margin-bottom:7px;}
.uw-acc span{color:var(--t2);}
.exbox{background:var(--bg);border:1px solid var(--b1);border-radius:5px;padding:9px;font-size:.66rem;color:var(--t2);margin-bottom:8px;line-height:1.6;}
.sl{list-style:none;}
.sl li{display:flex;gap:6px;font-size:.66rem;color:var(--t2);padding:4px 0;border-bottom:1px solid var(--b1);}
.sl li:last-child{border-bottom:none;}
.sn{color:var(--t3);flex-shrink:0;}
.rtags{display:flex;gap:5px;flex-wrap:wrap;margin-top:5px;}
.rtag{font-size:.6rem;padding:2px 7px;border-radius:3px;border:1px solid var(--b2);color:var(--t3);cursor:pointer;background:none;font-family:var(--fm);transition:all var(--tr);}
.rtag:hover{color:var(--t1);}
.try-cta{margin-top:14px;padding:10px;background:var(--s1);border:1px solid var(--b1);border-radius:var(--r);display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;}
.try-cta p{font-size:.68rem;color:var(--t2);}
/* BUTTONS */
.btn{padding:6px 12px;border-radius:6px;border:1px solid var(--b2);background:var(--s2);color:var(--t1);font-family:var(--fm);font-size:.66rem;cursor:pointer;transition:all var(--tr);display:inline-flex;align-items:center;gap:4px;}
.btn:hover{border-color:var(--t3);}
.btn:disabled{opacity:.4;cursor:not-allowed;}
.btn-p{background:var(--t1);color:var(--bg);border-color:var(--t1);}
.btn-p:hover{opacity:.88;}
.btn-a{border-color:var(--c,#fff);color:var(--c,#fff);}
.btn-a:hover{background:color-mix(in srgb,var(--c,#fff) 10%,transparent);}
.btn-sm{padding:4px 9px;font-size:.61rem;}
/* PLAYGROUND */
.pg{padding:0 24px 24px;}
.pt{display:flex;align-items:center;gap:8px;margin-bottom:14px;flex-wrap:wrap;}
.csel{background:var(--s1);border:1px solid var(--b2);color:var(--t1);font-family:var(--fm);font-size:.68rem;padding:6px 9px;border-radius:6px;cursor:pointer;min-width:145px;}
.play-lay{display:grid;grid-template-columns:1fr 260px;gap:10px;}
.chat{background:var(--s1);border:1px solid var(--b1);border-radius:var(--r);display:flex;flex-direction:column;height:450px;}
.cmsgs{flex:1;overflow-y:auto;padding:13px;display:flex;flex-direction:column;gap:10px;}
.cmsg{display:flex;gap:6px;align-items:flex-start;}
.cmsg.user{flex-direction:row-reverse;}
.cav{width:21px;height:21px;border-radius:50%;background:var(--s2);border:1px solid var(--b2);display:flex;align-items:center;justify-content:center;font-size:.56rem;flex-shrink:0;color:var(--t3);}
.cbub{max-width:80%;padding:7px 10px;border-radius:8px;font-size:.68rem;line-height:1.6;}
.cmsg.assistant .cbub{background:var(--s2);border:1px solid var(--b1);color:var(--t2);border-radius:3px 8px 8px 8px;}
.cmsg.user .cbub{background:var(--s2);border:1px solid var(--b2);color:var(--t1);border-radius:8px 3px 8px 8px;}
.cinrow{padding:8px;border-top:1px solid var(--b1);display:flex;gap:6px;}
.cin{flex:1;background:var(--bg);border:1px solid var(--b2);border-radius:5px;padding:7px 8px;color:var(--t1);font-family:var(--fm);font-size:.68rem;outline:none;resize:none;height:34px;transition:border-color var(--tr);}
.cin:focus{border-color:var(--t3);}
.scen{display:flex;flex-direction:column;gap:6px;}
.scen h4{font-size:.56rem;text-transform:uppercase;letter-spacing:.1em;color:var(--t3);}
.sbtn{background:var(--s1);border:1px solid var(--b1);border-radius:5px;padding:8px;cursor:pointer;text-align:left;transition:all var(--tr);color:var(--t2);font-family:var(--fm);font-size:.66rem;line-height:1.4;}
.sbtn:hover{border-color:var(--b2);color:var(--t1);}
.cpbox{background:var(--s1);border:1px solid var(--b1);border-radius:var(--r);padding:14px;height:450px;overflow-y:auto;}
.cprompt{background:var(--bg);border:1px solid var(--b2);border-left:3px solid #14B8A6;border-radius:5px;padding:9px;font-size:.66rem;color:var(--t2);line-height:1.6;margin:7px 0;white-space:pre-wrap;}
/* TOOLS */
.ts{padding:0 24px 24px;}
.ftls{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:20px;}
.ftc{background:var(--s1);border:1px solid var(--b1);border-radius:var(--r);padding:16px;cursor:pointer;transition:all var(--tr);position:relative;}
.ftc:hover{border-color:var(--b2);}
.fbadge{position:absolute;top:9px;right:9px;font-size:.52rem;text-transform:uppercase;letter-spacing:.08em;padding:2px 5px;border-radius:3px;background:var(--s2);color:var(--t3);border:1px solid var(--b2);}
.ftc h3{font-family:var(--fd);font-size:1.05rem;font-weight:700;margin-bottom:3px;}
.ftc p{font-size:.66rem;color:var(--t2);margin-bottom:10px;}
.tfilts{display:flex;gap:5px;margin-bottom:13px;flex-wrap:wrap;}
.fchip{padding:3px 10px;border-radius:12px;border:1px solid var(--b2);background:transparent;color:var(--t3);font-family:var(--fm);font-size:.61rem;cursor:pointer;transition:all var(--tr);}
.fchip.on{background:var(--s2);color:var(--t1);border-color:var(--t3);}
.tgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(165px,1fr));gap:8px;}
.tc{background:var(--s1);border:1px solid var(--b1);border-radius:var(--r);padding:12px;cursor:pointer;transition:all var(--tr);}
.tc:hover{border-color:var(--b2);}
.tn{font-family:var(--fd);font-size:.85rem;font-weight:700;margin-bottom:2px;}
.tt{font-size:.61rem;color:var(--t2);margin-bottom:6px;}
.tmeta{display:flex;gap:4px;flex-wrap:wrap;}
.tchip{font-size:.51rem;padding:2px 5px;border-radius:3px;background:var(--s2);color:var(--t3);border:1px solid var(--b1);}
.cb{color:#10B981;border-color:#10B981;}.ci{color:#F59E0B;border-color:#F59E0B;}.ca{color:#EC4899;border-color:#EC4899;}
.overlay{position:fixed;inset:0;z-index:100;background:rgba(0,0,0,.78);backdrop-filter:blur(5px);display:flex;align-items:center;justify-content:center;padding:20px;}
.opanel{background:var(--s1);border:1px solid var(--b2);border-radius:12px;padding:22px;max-width:450px;width:100%;max-height:80vh;overflow-y:auto;position:relative;}
.xbtn{position:absolute;top:10px;right:10px;background:var(--s2);border:1px solid var(--b2);color:var(--t3);width:26px;height:26px;border-radius:50%;cursor:pointer;font-size:.72rem;display:flex;align-items:center;justify-content:center;transition:all var(--tr);}
.xbtn:hover{color:var(--t1);}
.ws-box{background:var(--s1);border:1px solid var(--b1);border-radius:var(--r);padding:13px;margin-bottom:16px;}
/* DOTS */
.dots{display:flex;gap:3px;padding:2px 0;}
.dots span{width:5px;height:5px;border-radius:50%;background:var(--t3);animation:blink 1.2s infinite;}
.dots span:nth-child(2){animation-delay:.2s;}
.dots span:nth-child(3){animation-delay:.4s;}
@keyframes blink{0%,80%,100%{opacity:.3;}40%{opacity:1;}}
/* EXAMPLE SECTION */
.ex-wrap{padding:0 24px 40px;}
.ex-scenario{background:var(--s1);border:1px solid var(--b1);border-left:3px solid #7C3AED;border-radius:var(--r);padding:16px;margin-bottom:22px;}
.ex-scenario h4{font-size:.58rem;text-transform:uppercase;letter-spacing:.1em;color:#7C3AED;margin-bottom:7px;}
.ex-scenario p{font-size:.73rem;color:var(--t1);line-height:1.7;}
.ex-section-title{font-family:var(--fd);font-size:1.05rem;font-weight:700;color:var(--t1);margin-bottom:13px;}
.ex-cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(265px,1fr));gap:11px;margin-bottom:26px;}
.ex-card{background:var(--s1);border:1px solid var(--b1);border-radius:var(--r);padding:14px;position:relative;overflow:hidden;transition:all var(--tr);}
.ex-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:var(--c);opacity:.5;}
.ex-card:hover{border-color:var(--b2);}
.ex-card-top{display:flex;align-items:center;gap:9px;margin-bottom:8px;}
.ex-badge{font-size:.55rem;font-weight:700;padding:2px 5px;border-radius:3px;border:1px solid currentColor;font-family:var(--fm);}
.ex-card-label{font-family:var(--fd);font-size:.95rem;font-weight:700;color:var(--t1);}
.ex-role{font-size:.62rem;color:var(--t3);margin-bottom:5px;text-transform:uppercase;letter-spacing:.07em;}
.ex-contrib{font-size:.67rem;color:var(--t2);line-height:1.6;white-space:pre-line;margin-bottom:10px;}
.flow-section{margin-bottom:24px;}
.flow-steps{display:flex;flex-direction:column;}
.flow-step{display:flex;align-items:flex-start;gap:11px;padding:9px 0;border-bottom:1px solid var(--b1);}
.flow-step:last-child{border-bottom:none;}
.flow-num{width:20px;height:20px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.58rem;font-weight:700;flex-shrink:0;border:1px solid currentColor;font-family:var(--fm);}
.flow-label{font-size:.7rem;color:var(--t1);line-height:1.4;flex:1;}
.flow-badge{font-size:.55rem;padding:1px 5px;border-radius:3px;border:1px solid currentColor;font-family:var(--fm);margin-left:5px;vertical-align:middle;white-space:nowrap;}
.outcome-section{background:var(--s1);border:1px solid var(--b1);border-radius:var(--r);padding:16px;margin-bottom:18px;}
.outcome-section h3{font-family:var(--fd);font-size:.95rem;font-weight:700;margin-bottom:10px;}
.outcome-item{display:flex;gap:7px;font-size:.68rem;color:var(--t2);padding:5px 0;border-bottom:1px solid var(--b1);line-height:1.5;}
.outcome-item:last-child{border-bottom:none;}
.outcome-check{color:#10B981;flex-shrink:0;font-weight:700;}
/* EXAMPLE SWITCHER */
.ex-tabs{display:flex;gap:0;margin-bottom:22px;border:1px solid var(--b1);border-radius:var(--r);overflow:hidden;}
.ex-tab{flex:1;padding:10px 8px;cursor:pointer;font-size:.66rem;color:var(--t3);background:none;border:none;font-family:var(--fm);transition:all var(--tr);text-align:center;line-height:1.3;border-right:1px solid var(--b1);}
.ex-tab:last-child{border-right:none;}
.ex-tab:hover{color:var(--t2);background:var(--s2);}
.ex-tab.on{color:var(--t1);background:var(--s2);}
.ex-tab-icon{display:block;font-size:1rem;margin-bottom:3px;}
.ex-concepts-used{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:18px;}
.ex-concept-pill{font-size:.6rem;padding:3px 8px;border-radius:4px;border:1px solid currentColor;font-family:var(--fm);}
/* BUILD YOUR SETUP */
.build-box{background:var(--s1);border:1px solid var(--b1);border-radius:var(--r);padding:20px;margin-bottom:24px;}
.build-box h3{font-family:var(--fd);font-size:1.05rem;font-weight:700;color:var(--t1);margin-bottom:5px;}
.build-box p{font-size:.7rem;color:var(--t2);margin-bottom:14px;line-height:1.5;}
.build-input{width:100%;background:var(--bg);border:1px solid var(--b2);border-radius:7px;padding:11px 13px;color:var(--t1);font-family:var(--fm);font-size:.73rem;outline:none;resize:none;height:80px;transition:border-color var(--tr);line-height:1.5;}
.build-input:focus{border-color:var(--t3);}
.build-result{margin-top:18px;display:flex;flex-direction:column;gap:14px;}
.build-section-label{font-size:.58rem;text-transform:uppercase;letter-spacing:.1em;color:var(--t3);margin-bottom:8px;}
.build-concept-chips{display:flex;flex-wrap:wrap;gap:7px;}
.build-chip{display:flex;align-items:center;gap:6px;padding:5px 11px;border-radius:6px;border:1px solid currentColor;font-size:.68rem;font-family:var(--fm);}
.build-chip-skip{opacity:.35;border-style:dashed;}
.build-plan{background:var(--bg);border:1px solid var(--b1);border-radius:8px;padding:14px;}
.build-plan-step{display:flex;gap:10px;padding:8px 0;border-bottom:1px solid var(--b1);font-size:.71rem;color:var(--t2);line-height:1.5;}
.build-plan-step:last-child{border-bottom:none;}
.build-plan-num{font-weight:700;flex-shrink:0;min-width:18px;}
/* PROMPT OVERLAY */
.prompt-overlay{position:fixed;inset:0;z-index:200;background:rgba(0,0,0,.82);backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;padding:20px;}
.prompt-panel{background:var(--s1);border:1px solid var(--b2);border-radius:12px;padding:22px;max-width:560px;width:100%;max-height:85vh;overflow-y:auto;position:relative;}
.prompt-pre{background:var(--bg);border:1px solid var(--b1);border-radius:6px;padding:13px;font-size:.67rem;color:var(--t2);line-height:1.75;white-space:pre-wrap;margin:11px 0;font-family:var(--fm);}
::-webkit-scrollbar{width:3px;}
::-webkit-scrollbar-track{background:transparent;}
::-webkit-scrollbar-thumb{background:var(--b2);border-radius:2px;}
`;

// ─── APP ─────────────────────────────────────────────────────────────────────
function App() {
  const [lang, setLang] = useState("en");
  const [platform, setPlatform] = useState("claude");
  const [section, setSection] = useState("map");
  const [activeConcept, setActiveConcept] = useState(null);
  const [wtStep, setWtStep] = useState(0);
  const [uwTab, setUwTab] = useState("claude");
  const t = T[lang];

  const [prebuildMsg, setPrebuildMsg] = useState("");

  const goLearn = (id) => { setActiveConcept(id); setSection("learn"); setWtStep(0); setUwTab("claude"); };
  const goTry = (id) => { setActiveConcept(id); setSection("try"); };
  const goTryWithMsg = (id, msg) => { setActiveConcept(id); setPrebuildMsg(msg); setSection("try"); };

  const NAV = [
    { id:"map",     label:t.navMap,     icon:"◈", color:"#00D4FF" },
    { id:"learn",   label:t.navLearn,   icon:"◆", color:"#7C3AED" },
    { id:"try",     label:t.navTry,     icon:"◎", color:"#10B981" },
    { id:"tools",   label:t.navTools,   icon:"⬡", color:"#F59E0B" },
    { id:"example", label:t.navExample, icon:"★", color:"#EC4899" },
  ];

  return (
    <>
      <style>{css}</style>
      <div className="app">
        {/* ── Top header: title + toggles ── */}
        <header className="header">
          <div className="header-brand">
            <h1>{t.appTitle}</h1>
            <p>{t.appSubtitle}</p>
          </div>
          <div className="header-right">
            <div className="tg">
              <button className={`tb ${lang === "en" ? "on" : ""}`} onClick={() => setLang("en")}>EN</button>
              <button className={`tb ${lang === "nl" ? "on" : ""}`} onClick={() => setLang("nl")}>NL</button>
            </div>
            <div className="tg">
              <button className={`tb ${platform === "claude" ? "on" : ""}`} onClick={() => setPlatform("claude")}>Claude</button>
              <button className={`tb ${platform === "copilot" ? "on" : ""}`} onClick={() => setPlatform("copilot")}>Copilot</button>
            </div>
          </div>
        </header>

        {/* ── Main content ── */}
        <main className="main">
          {section === "map"     && <MapSection t={t} lang={lang} onSelect={goLearn} />}
          {section === "learn"   && !activeConcept && <GridSection t={t} lang={lang} onSelect={goLearn} />}
          {section === "learn"   && activeConcept && (
            <DetailSection t={t} lang={lang} id={activeConcept}
              wtStep={wtStep} setWtStep={setWtStep}
              uwTab={uwTab} setUwTab={setUwTab}
              onBack={() => setActiveConcept(null)}
              onRelated={goLearn} onTry={goTry}
            />
          )}
          {section === "try"     && <PlaySection t={t} lang={lang} initId={activeConcept} platform={platform} setPlatform={setPlatform} prebuildMsg={prebuildMsg} setPrebuildMsg={setPrebuildMsg} />}
          {section === "tools"   && <ToolsSection t={t} lang={lang} />}
          {section === "example" && <ExampleSection t={t} lang={lang} onTry={goTry} onTryWithMsg={goTryWithMsg} />}
        </main>

        {/* ── Bottom tab bar ── */}
        <nav className="bottomnav">
          {NAV.map(n => (
            <button key={n.id} className={`ni ${section === n.id ? "on" : ""}`}
              style={{"--c": n.color}} onClick={() => setSection(n.id)}>
              <span className="ni-bar" />
              <span className="ni-icon">{n.icon}</span>
              <span>{n.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </>
  );
}

// ─── MAP ─────────────────────────────────────────────────────────────────────
// Fixed layout — 4 logical layers:
//  Layer 0 (y=12%):  Models (foundation)
//  Layer 1 (y=32%):  Tokens · Agents  (core building blocks)
//  Layer 2 (y=54%):  Coworkers · Skills · Subagents · MCP  (what agents use)
//  Layer 3 (y=76%):  RAG · References  (data & grounding)
const MAP_LAYOUT = {
  // Layer 0 — Foundation
  models:     { x: 50,  y: 8  },
  // Layer 1 — The three inputs every AI system needs
  tokens:     { x: 18,  y: 25 },
  prompts:    { x: 50,  y: 25 },
  agents:     { x: 82,  y: 25 },
  // Layer 2 — What you build on top of agents
  coworkers:  { x: 16,  y: 47 },
  skills:     { x: 38,  y: 47 },
  subagents:  { x: 62,  y: 47 },
  mcp:        { x: 84,  y: 47 },
  // Layer 3 — How you ground outputs in real data
  rag:        { x: 32,  y: 68 },
  references: { x: 68,  y: 68 },
  // Layer 4 — How you persist instructions across sessions
  claudemd:   { x: 32,  y: 88 },
  copilotmd:  { x: 68,  y: 88 },
};

function MapSection({ t, lang, onSelect }) {
  const [hov, setHov] = useState(null);
  const VW = 720, VH = 500, PAD = 52;

  const pos = (id) => {
    const p = MAP_LAYOUT[id] || { x: 50, y: 50 };
    return { x: PAD + (p.x / 100) * VW, y: PAD + (p.y / 100) * VH };
  };

  // Curved path between two points — gentle arc that avoids crossing
  const curvePath = (a, b) => {
    const pa = pos(a), pb = pos(b);
    const dx = pb.x - pa.x, dy = pb.y - pa.y;
    const dist = Math.sqrt(dx*dx + dy*dy);
    // Longer edges curve more, short edges stay subtle
    const bend = dist * 0.18;
    const mx = (pa.x + pb.x) / 2 + dy * (bend / dist);
    const my = (pa.y + pb.y) / 2 - dx * (bend / dist);
    return `M ${pa.x} ${pa.y} Q ${mx} ${my} ${pb.x} ${pb.y}`;
  };

  // Layer labels
  const LAYERS = [
    { y: 8,  en: "Foundation",            nl: "Basis" },
    { y: 25, en: "Inputs",                nl: "Invoer" },
    { y: 47, en: "Agent capabilities",    nl: "Agent-mogelijkheden" },
    { y: 68, en: "Data & grounding",      nl: "Data & verankering" },
    { y: 88, en: "Instruction files",     nl: "Instructiebestanden" },
  ];

  return (
    <div>
      <div className="sh"><h2>{t.navMap}</h2><p>{t.mapIntro}</p></div>
      <div className="mwrap">
        <svg className="msvg" viewBox={`0 0 ${VW + PAD * 2} ${VH + PAD * 2}`}>
          <defs>
            {CONCEPTS.map(c => (
              <radialGradient key={c.id} id={`rg-${c.id}`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={c.color} stopOpacity={hov === c.id ? 0.35 : 0.1} />
                <stop offset="100%" stopColor={c.color} stopOpacity="0" />
              </radialGradient>
            ))}
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0.5 L0,5.5 L5.5,3 Z" fill="#4a6080" opacity="0.8" />
            </marker>
            <marker id="arrow-active" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0.5 L0,5.5 L5.5,3 Z" fill="currentColor" />
            </marker>
          </defs>

          {/* Layer dividers */}
          {LAYERS.map((layer, i) => {
            const ly = PAD + (layer.y / 100) * VH - 28;
            return (
              <g key={i}>
                <line x1={PAD} y1={ly} x2={VW + PAD} y2={ly}
                  stroke="#3d5068" strokeWidth="1" strokeDasharray="2 6" opacity="0.75" />
                <text x={4} y={ly - 3} textAnchor="start" fontSize="9"
                  fill="#4a5a72" fontFamily="DM Mono,monospace" fontStyle="italic">
                  {layer[lang] || layer.en}
                </text>
              </g>
            );
          })}

          {/* Edges — drawn first so nodes sit on top */}
          {EDGES.map(([a, b], i) => {
            const act = hov === a || hov === b;
            const ca = CONCEPTS.find(c => c.id === a);
            if (!ca || !MAP_LAYOUT[a] || !MAP_LAYOUT[b]) return null;
            return (
              <path key={i}
                d={curvePath(a, b)}
                fill="none"
                stroke={act ? ca.color : "#4a6080"}
                strokeWidth={act ? 2 : 1.2}
                opacity={act ? 0.85 : 0.6}
                strokeDasharray={act ? "none" : "4 5"}
                markerEnd={act ? undefined : "url(#arrow)"}
                style={{ transition: "stroke 0.2s, opacity 0.2s, stroke-width 0.2s" }}
              />
            );
          })}

          {/* Nodes */}
          {CONCEPTS.map(c => {
            const p = pos(c.id);
            const d = c[lang] || c.en;
            const h = hov === c.id;
            const R = h ? 26 : 21;
            return (
              <g key={c.id} style={{ cursor: "pointer" }}
                onMouseEnter={() => setHov(c.id)} onMouseLeave={() => setHov(null)}
                onClick={() => onSelect(c.id)}>
                {/* Glow halo */}
                <circle cx={p.x} cy={p.y} r={R + 12}
                  fill={`url(#rg-${c.id})`} style={{ transition: "r .2s" }} />
                {/* Node circle */}
                <circle cx={p.x} cy={p.y} r={R}
                  fill={h ? `color-mix(in srgb, ${c.color} 15%, #0f1117)` : "#0f1117"}
                  stroke={c.color} strokeWidth={h ? 2.5 : 1.5}
                  filter={h ? "url(#glow)" : "none"}
                  style={{ transition: "all .2s" }} />
                {/* Icon badge */}
                <text x={p.x} y={p.y - 3} textAnchor="middle" dominantBaseline="central"
                  fontSize={h ? 13 : 11} fontWeight="700" fill={c.color}
                  style={{ pointerEvents: "none", fontFamily: "DM Mono,monospace" }}>
                  {c.icon}
                </text>
                {/* Label below node */}
                <text x={p.x} y={p.y + R + 10} textAnchor="middle"
                  fontSize="11" fontWeight={h ? "700" : "400"}
                  fill={h ? c.color : "#8a9ab0"}
                  style={{ pointerEvents: "none", fontFamily: "DM Mono,monospace", transition: "fill .2s" }}>
                  {d.label}
                </text>
                {/* Short desc on hover */}
                {h && (
                  <text x={p.x} y={p.y + R + 21} textAnchor="middle"
                    fontSize="9" fill="#4a5a72"
                    style={{ pointerEvents: "none", fontFamily: "DM Mono,monospace" }}>
                    {d.short}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

// ─── GRID ─────────────────────────────────────────────────────────────────────
function GridSection({ t, lang, onSelect }) {
  return (
    <div>
      <div className="sh"><h2>{t.learnTitle}</h2><p>{t.learnSubtitle}</p></div>
      <div className="cgrid">
        {CONCEPTS.map(c => {
          const d = c[lang] || c.en;
          return (
            <div key={c.id} className="cc" style={{ "--c": c.color }} onClick={() => onSelect(c.id)}>
              <div className="cc-icon" style={{ color: c.color, borderColor: c.color }}>{c.icon}</div>
              <div className="cc-label">{d.label}</div>
              <div className="cc-short">{d.short}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── DETAIL ───────────────────────────────────────────────────────────────────
function DetailSection({ t, lang, id, wtStep, setWtStep, uwTab, setUwTab, onBack, onRelated, onTry }) {
  const concept = CONCEPTS.find(c => c.id === id);
  if (!concept) return null;
  const d = concept[lang] || concept.en;
  const [playing, setPlaying] = useState(false);
  const timerRef = useRef(null);

  const playWt = () => { setWtStep(0); setPlaying(true); };
  useEffect(() => {
    if (playing) {
      timerRef.current = setInterval(() => {
        setWtStep(s => {
          if (s >= d.walkthrough.length - 1) { setPlaying(false); return s; }
          return s + 1;
        });
      }, 1100);
    }
    return () => clearInterval(timerRef.current);
  }, [playing, d.walkthrough.length]);

  const guide = uwTab === "claude" ? d.claudeGuide : d.copilotGuide;

  return (
    <div>
      <div className="sh">
        <button className="back" onClick={onBack}>{t.backToAll}</button>
        <div className="dh">
          <div className="dh-ic" style={{ background: `color-mix(in srgb,${concept.color} 12%,#0f1117)`, borderColor: `color-mix(in srgb,${concept.color} 30%,#1a2030)` }}>
            <span style={{ color: concept.color, fontWeight: 700, fontSize: ".58rem" }}>{concept.icon}</span>
          </div>
          <div>
            <h2 style={{ color: concept.color }}>{d.label}</h2>
            <p className="dsub">{d.short}</p>
          </div>
        </div>
      </div>
      <div className="cd">
        <div className="dgrid">
          <div className="dc"><h4>{t.definitionLabel}</h4><p>{d.definition}</p></div>
          <div className="dc"><h4>{t.analogyLabel}</h4><p style={{ fontStyle: "italic", color: "var(--t3)" }}>{d.analogy}</p></div>
          <div className="dc">
            <h4>{t.factsLabel}</h4>
            <ul className="fl">
              {d.facts.map((f, i) => (
                <li key={i}><span className="fk">{f.k}</span><span>{f.v}</span></li>
              ))}
            </ul>
          </div>
          <div className="dc">
            <h4>{t.relatedLabel}</h4>
            <div className="rtags">
              {concept.related.map(rid => {
                const rc = CONCEPTS.find(c => c.id === rid);
                if (!rc) return null;
                const rd = rc[lang] || rc.en;
                return (
                  <button key={rid} className="rtag" style={{ borderColor: rc.color, color: rc.color }} onClick={() => onRelated(rid)}>
                    {rd.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="wt">
          <h4>{t.stepByStep}</h4>
          {d.walkthrough.map((step, i) => (
            <div key={i} className={`wts-item ${i <= wtStep ? "on" : ""}`} style={{ "--c": concept.color }}>
              <div className="wn">{i + 1}</div>
              <div className="wtext">{step}</div>
            </div>
          ))}
          <div className="wctrl">
            <button className="btn btn-sm btn-a" style={{ "--c": concept.color }} onClick={playWt}>
              {playing ? (lang === "en" ? "Playing…" : "Bezig…") : t.showHow}
            </button>
            {wtStep > 0 && !playing && (
              <button className="btn btn-sm" onClick={() => setWtStep(0)}>Reset</button>
            )}
          </div>
        </div>

        <div className="uw">
          <div className="uw-head">
            <button className={`uwt ${uwTab === "claude" ? "on" : ""}`} style={{ "--c": concept.color }} onClick={() => setUwTab("claude")}>
              {t.claudeGuide}
            </button>
            <button className={`uwt ${uwTab === "copilot" ? "on" : ""}`} style={{ "--c": concept.color }} onClick={() => setUwTab("copilot")}>
              {t.copilotGuide}
            </button>
          </div>
          <div className="uw-body">
            <div className="uw-acc">{lang === "en" ? "Access: " : "Toegang: "}<span>{guide.access}</span></div>
            <div className="exbox">{guide.example}</div>
            <ul className="sl">
              {guide.steps.map((s, i) => (
                <li key={i}><span className="sn">{i + 1}.</span>{s}</li>
              ))}
            </ul>
            <div style={{ marginTop: 9 }}>
              <a href={guide.docsUrl} target="_blank" rel="noopener noreferrer">
                <button className="btn btn-sm">{t.officialDocs}</button>
              </a>
            </div>
          </div>
        </div>

        <div className="try-cta">
          <p>{lang === "en" ? `Ready to try ${d.label} hands-on?` : `Klaar om ${d.label} hands-on te proberen?`}</p>
          <button className="btn btn-a" style={{ "--c": concept.color }} onClick={() => onTry(id)}>{t.tryItBtn}</button>
        </div>
      </div>
    </div>
  );
}

// ─── PLAYGROUND ───────────────────────────────────────────────────────────────
function PlaySection({ t, lang, initId, platform, setPlatform, prebuildMsg, setPrebuildMsg }) {
  const [selId, setSelId] = useState(initId || CONCEPTS[0].id);
  const [msgs, setMsgs] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [cpIdx, setCpIdx] = useState(null);
  const endRef = useRef(null);
  const didSendPrebuild = useRef(false);

  const concept = CONCEPTS.find(c => c.id === selId) || CONCEPTS[0];
  const d = concept[lang] || concept.en;

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);
  useEffect(() => { if (initId) setSelId(initId); }, [initId]);

  // Auto-send prebuildMsg once when arriving from the builder
  useEffect(() => {
    if (prebuildMsg && !didSendPrebuild.current) {
      didSendPrebuild.current = true;
      send(prebuildMsg);
      if (setPrebuildMsg) setPrebuildMsg("");
    }
  }, [prebuildMsg]);

  const send = async (text) => {
    if (!text.trim() || loading) return;
    const userMsg = { role: "user", content: text };
    setMsgs(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    try {
      const sys = lang === "nl"
        ? `Je bent een behulpzame AI-leercoach die mensen helpt het concept "${d.label}" te begrijpen. Geef heldere, beknopte uitleg met praktische voorbeelden. Antwoord altijd in het Nederlands.`
        : `You are a helpful AI learning coach helping people understand "${d.label}". Give clear, concise explanations with practical examples. Keep responses focused and educational.`;
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json", "anthropic-version": "2023-06-01" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: sys,
          messages: [...msgs, userMsg].map(m => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await response.json();
      const reply = data.content?.map(b => b.text || "").join("") || (lang === "nl" ? "Er ging iets mis." : "Something went wrong.");
      setMsgs(prev => [...prev, { role: "assistant", content: reply }]);
    } catch (e) {
      setMsgs(prev => [...prev, { role: "assistant", content: lang === "nl" ? "Fout opgetreden." : "Error occurred." }]);
    }
    setLoading(false);
  };

  const copy = (txt, i) => { navigator.clipboard.writeText(txt); setCpIdx(i); setTimeout(() => setCpIdx(null), 2000); };

  return (
    <div>
      <div className="sh"><h2>{t.tryTitle}</h2><p>{t.trySubtitle}</p></div>
      <div className="pg">
        <div className="pt">
          <select className="csel" value={selId} onChange={e => { setSelId(e.target.value); setMsgs([]); }}>
            {CONCEPTS.map(c => {
              const cd = c[lang] || c.en;
              return <option key={c.id} value={c.id}>{cd.label}</option>;
            })}
          </select>
          <div className="tg">
            <button className={`tb ${platform === "claude" ? "on" : ""}`} onClick={() => setPlatform("claude")}>Claude</button>
            <button className={`tb ${platform === "copilot" ? "on" : ""}`} onClick={() => setPlatform("copilot")}>Copilot</button>
          </div>
        </div>

        <div className="play-lay">
          {platform === "claude" ? (
            <div className="chat">
              <div className="cmsgs">
                {msgs.length === 0 && (
                  <div style={{ color: "var(--t3)", fontSize: ".68rem", textAlign: "center", marginTop: 30 }}>
                    {lang === "en" ? `Ask anything about "${d.label}" or pick a scenario` : `Stel een vraag over "${d.label}" of kies een scenario`}
                  </div>
                )}
                {msgs.map((m, i) => (
                  <div key={i} className={`cmsg ${m.role}`}>
                    <div className="cav">{m.role === "user" ? "U" : "AI"}</div>
                    <div className="cbub" style={{ whiteSpace: "pre-wrap" }}>{m.content}</div>
                  </div>
                ))}
                {loading && (
                  <div className="cmsg assistant">
                    <div className="cav">AI</div>
                    <div className="cbub"><div className="dots"><span /><span /><span /></div></div>
                  </div>
                )}
                <div ref={endRef} />
              </div>
              <div className="cinrow">
                <textarea className="cin" value={input} onChange={e => setInput(e.target.value)}
                  placeholder={t.yourMessage}
                  onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); } }}
                />
                <button className="btn btn-p" onClick={() => send(input)} disabled={loading || !input.trim()}>
                  {loading ? "…" : t.send}
                </button>
              </div>
            </div>
          ) : (
            <div className="cpbox">
              <p style={{ fontSize: ".67rem", color: "var(--t2)", marginBottom: 10 }}>{t.copilotNote}</p>
              {d.scenarios.map((s, i) => (
                <div key={i} style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: ".61rem", color: "var(--t3)", marginBottom: 4 }}>{s.label}</div>
                  <div className="cprompt">{s.prompt}</div>
                  <button className="btn btn-sm" onClick={() => copy(s.prompt, i)}>
                    {cpIdx === i ? t.copied : t.copyPrompt}
                  </button>
                </div>
              ))}
              <div style={{ marginTop: 14, padding: 9, background: "var(--bg)", borderRadius: 5, border: "1px solid var(--b1)" }}>
                <p style={{ fontSize: ".62rem", color: "var(--t3)" }}>
                  {lang === "en" ? "Open Copilot Chat in VS Code (Ctrl+Shift+I), paste a prompt and send." : "Open Copilot Chat in VS Code (Ctrl+Shift+I), plak een prompt en verstuur."}
                </p>
              </div>
            </div>
          )}

          <div className="scen">
            <h4>{t.scenario}</h4>
            {d.scenarios.map((s, i) => (
              <button key={i} className="sbtn" onClick={() => { if (platform === "claude") send(s.prompt); }}>
                <strong style={{ display: "block", marginBottom: 2, color: concept.color }}>{s.label}</strong>
                {s.prompt.slice(0, 65)}…
              </button>
            ))}
            {msgs.length > 0 && platform === "claude" && (
              <button className="btn btn-sm" style={{ marginTop: 4 }} onClick={() => setMsgs([])}>{t.clearChat}</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── TOOLS ───────────────────────────────────────────────────────────────────
function ToolsSection({ t, lang }) {
  const [filter, setFilter] = useState("all");
  const [sel, setSel] = useState(null);
  const [ws, setWs] = useState(false);
  const [wsAns, setWsAns] = useState(null);

  const featured = TOOLS.filter(x => x.featured);
  const filtered = TOOLS.filter(x => {
    if (filter === "all") return true;
    if (filter === "claude") return x.platform === "claude" || x.platform === "both";
    if (filter === "copilot") return x.platform === "copilot" || x.platform === "both";
    if (filter === "beginner") return x.complexity === "Beginner";
    return true;
  });

  const wsOpts = [
    { k:"a", label:t.whereStartQ1a, rec:"n8n",     reason:lang==="en"?"n8n lets you visually automate tasks with AI — no code needed.":"n8n laat je visueel automatiseren met AI — geen code nodig." },
    { k:"b", label:t.whereStartQ1b, rec:"claude",   reason:lang==="en"?"Claude at claude.ai is the fastest way to start generating content.":"Claude op claude.ai is de snelste manier om te beginnen." },
    { k:"c", label:t.whereStartQ1c, rec:"copilot",  reason:lang==="en"?"GitHub Copilot gives instant AI code suggestions as you type.":"GitHub Copilot geeft direct AI-codesuggesties." },
    { k:"d", label:t.whereStartQ1d, rec:"claude",   reason:lang==="en"?"Start with Claude — ask it to explain any concept in plain language.":"Begin met Claude — vraag het elk concept uit te leggen." },
  ];

  const cpx = c => { if (c === "Beginner") return "cb"; if (c === "Intermediate") return "ci"; return "ca"; };

  return (
    <div>
      <div className="sh"><h2>{t.toolsTitle}</h2><p>{t.toolsSubtitle}</p></div>
      <div className="ts">
        <div className="ftls">
          {featured.map(tool => (
            <div key={tool.id} className="ftc" onClick={() => setSel(tool)}>
              <span className="fbadge">{lang === "en" ? "Featured" : "Uitgelicht"}</span>
              <h3>{tool.name}</h3>
              <p>{tool.tagline}</p>
              <button className="btn btn-sm">{t.getStarted}</button>
            </div>
          ))}
        </div>

        <div style={{ marginBottom: 16 }}>
          {!ws && !wsAns && <button className="btn" onClick={() => setWs(true)}>? {t.whereStart}</button>}
          {ws && !wsAns && (
            <div className="ws-box">
              <p style={{ fontSize: ".71rem", color: "var(--t2)", marginBottom: 9 }}>{t.whereStartQ1}</p>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {wsOpts.map(o => <button key={o.k} className="btn" onClick={() => { setWs(false); setWsAns(o); }}>{o.label}</button>)}
              </div>
            </div>
          )}
          {wsAns && (
            <div className="ws-box">
              <p style={{ fontSize: ".56rem", color: "var(--t3)", marginBottom: 4, textTransform: "uppercase", letterSpacing: ".1em" }}>{t.whereStartResult}</p>
              <p style={{ fontSize: ".88rem", fontFamily: "var(--fd)", fontWeight: 700, marginBottom: 4 }}>{TOOLS.find(x => x.id === wsAns.rec)?.name}</p>
              <p style={{ fontSize: ".68rem", color: "var(--t2)", marginBottom: 9 }}>{wsAns.reason}</p>
              <div style={{ display: "flex", gap: 6 }}>
                <button className="btn btn-sm" onClick={() => setSel(TOOLS.find(x => x.id === wsAns.rec))}>{t.getStarted}</button>
                <button className="btn btn-sm" onClick={() => { setWsAns(null); setWs(false); }}>{t.startOver}</button>
              </div>
            </div>
          )}
        </div>

        <div className="tfilts">
          {[["all", t.filterAll], ["claude", t.filterClaude], ["copilot", t.filterCopilot], ["beginner", t.filterBeginner]].map(([k, l]) => (
            <button key={k} className={`fchip ${filter === k ? "on" : ""}`} onClick={() => setFilter(k)}>{l}</button>
          ))}
        </div>

        <div className="tgrid">
          {filtered.map(tool => (
            <div key={tool.id} className="tc" onClick={() => setSel(tool)}>
              <div className="tn">{tool.name}</div>
              <div className="tt">{tool.tagline}</div>
              <div className="tmeta">
                <span className="tchip">{tool.category}</span>
                <span className={`tchip ${cpx(tool.complexity)}`}>{tool.complexity}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {sel && (
        <div className="overlay" onClick={e => { if (e.target === e.currentTarget) setSel(null); }}>
          <div className="opanel">
            <button className="xbtn" onClick={() => setSel(null)}>{t.close}</button>
            <h3 style={{ fontFamily: "var(--fd)", fontSize: "1.25rem", fontWeight: 700, marginBottom: 4 }}>{sel.name}</h3>
            <p style={{ fontSize: ".67rem", color: "var(--t2)", marginBottom: 12 }}>{sel.tagline}</p>
            <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 13 }}>
              <span className="tchip">{sel.category}</span>
              <span className={`tchip ${cpx(sel.complexity)}`}>{sel.complexity}</span>
              <span className="tchip">{sel.platform}</span>
            </div>
            <h4 style={{ fontSize: ".56rem", textTransform: "uppercase", letterSpacing: ".1em", color: "var(--t3)", marginBottom: 7 }}>{t.setupSteps}</h4>
            <ul className="sl" style={{ marginBottom: 13 }}>
              {sel.steps.map((s, i) => <li key={i}><span className="sn">{i + 1}.</span>{s}</li>)}
            </ul>
            {sel.concepts.length > 0 && (
              <>
                <h4 style={{ fontSize: ".56rem", textTransform: "uppercase", letterSpacing: ".1em", color: "var(--t3)", marginBottom: 5 }}>{t.relatedConcepts}</h4>
                <div className="rtags" style={{ marginBottom: 13 }}>
                  {sel.concepts.map(cid => {
                    const c = CONCEPTS.find(x => x.id === cid);
                    if (!c) return null;
                    const cd = c[lang] || c.en;
                    return <span key={cid} className="rtag" style={{ borderColor: c.color, color: c.color }}>{cd.label}</span>;
                  })}
                </div>
              </>
            )}
            <a href={sel.url} target="_blank" rel="noopener noreferrer">
              <button className="btn btn-p">{t.getStarted}</button>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── EXAMPLE SECTION ─────────────────────────────────────────────────────────
function ExampleSection({ t, lang, onTry, onTryWithMsg }) {
  const [promptModal, setPromptModal] = useState(null);
  const [idea, setIdea] = useState("");
  const [setup, setSetup] = useState(null);

  const getLabel = (ec) => {
    if (ec.id === "prompt_concept") return lang === "en" ? "Prompt" : "Prompt";
    if (ec.id === "workflow_concept") return lang === "en" ? "Workflow" : "Workflow";
    const found = CONCEPTS.find(c => c.id === ec.id);
    return found ? (found[lang] || found.en).label : ec.id;
  };

  // Rule-based concept matcher — scores each concept by keyword relevance
  const analyseIdea = () => {
    if (!idea.trim()) return;
    const text = idea.toLowerCase();

    const rules = {
      models:     ["model","ai","gpt","claude","llm","language model","smart","intelligent","generate","write","read","understand"],
      prompts:    ["prompt","instruct","tell","ask","question","command","style","tone","format","rule","how to respond"],
      agents:     ["automat","agent","loop","task","do it","run","execute","monitor","watch","trigger","workflow","automatically","schedule","every","daily","weekly","routine"],
      subagents:  ["multiple","parallel","specialist","team","delegate","split","research and write","different tasks","several"],
      skills:     ["style","tone","format","template","consistent","always","convention","rule","standard","guideline","house style"],
      rag:        ["document","pdf","file","knowledge","handbook","database","data","company","internal","private","source","upload","store"],
      references: ["cite","source","verify","fact","accurate","hallucin","trust","proof","link","reference"],
      mcp:        ["connect","integration","tool","slack","github","jira","calendar","email send","send mail","api","plugin","extension"],
      coworkers:  ["team","colleague","ongoing","persistent","daily","weekly","remember","context","session","assistant"],
      tokens:     ["long","large","many","pages","document","limit","context","size","cost","expensive"],
      claudemd:   ["claude code","codebase","project","repo","convention","remember","always follow"],
      copilotmd:  ["copilot","vscode","code suggestion","coding style","github copilot"],
    };

    // Score each concept
    const scores = {};
    for (const [id, keywords] of Object.entries(rules)) {
      scores[id] = keywords.filter(kw => text.includes(kw)).length;
    }

    // Always include models and prompts as baseline
    scores.models = Math.max(scores.models, 1);
    scores.prompts = Math.max(scores.prompts, 1);

    // If agent-like activity detected, boost agents
    if (scores.agents > 0) {
      scores.subagents = Math.max(scores.subagents, 0);
      scores.mcp = Math.max(scores.mcp, 0);
    }

    // Sort into needed (score>0) and skip
    const needed = Object.entries(scores)
      .filter(([,s]) => s > 0)
      .sort((a,b) => b[1]-a[1])
      .map(([id]) => id);

    const skip = CONCEPTS.map(c => c.id).filter(id => !needed.includes(id));

    // Build a step-by-step plan based on what's needed
    const planOrder = ["models","prompts","skills","claudemd","copilotmd","agents","subagents","mcp","rag","references","tokens","coworkers"];
    const planSteps = planOrder
      .filter(id => needed.includes(id))
      .slice(0, 6)
      .map((id, i) => {
        const c = CONCEPTS.find(x => x.id === id);
        const d = c?.[lang] || c?.en;
        const actions = {
          en: {
            models:    `Choose a model (Claude Sonnet recommended) — it will power every step of your idea`,
            prompts:   `Write a clear system prompt that defines how the AI should behave for "${idea.trim().slice(0,40)}…"`,
            agents:    `Set up an agent that receives the trigger and executes the task end-to-end`,
            subagents: `Split the work: one subagent to gather input, one to process, one to output`,
            skills:    `Write a SKILL.md that defines the tone, format and rules your AI must always follow`,
            rag:       `Connect your documents or data so the AI can look up relevant information`,
            references:`Add citation rules so every AI output links back to its source`,
            mcp:       `Connect external tools via MCP (email, calendar, Slack, etc.) so the agent can act`,
            coworkers: `Set up a persistent AI coworker that remembers context across sessions`,
            tokens:    `Check your context budget — summarise long inputs before sending to the model`,
            claudemd:  `Create CLAUDE.md with your project rules so Claude Code always follows your conventions`,
            copilotmd: `Create .github/copilot-instructions.md so Copilot follows your coding style`,
          },
          nl: {
            models:    `Kies een model (Claude Sonnet aanbevolen) — het drijft elke stap van je idee aan`,
            prompts:   `Schrijf een duidelijke systeemprompt die bepaalt hoe de AI zich gedraagt voor "${idea.trim().slice(0,40)}…"`,
            agents:    `Stel een agent in die de trigger ontvangt en de taak van begin tot eind uitvoert`,
            subagents: `Splits het werk: één subagent voor invoer, één voor verwerking, één voor uitvoer`,
            skills:    `Schrijf een SKILL.md die de toon, opmaak en regels definieert die de AI altijd moet volgen`,
            rag:       `Koppel je documenten of data zodat de AI relevante informatie kan opzoeken`,
            references:`Voeg citatieregels toe zodat elke AI-uitvoer terugverwijst naar de bron`,
            mcp:       `Verbind externe tools via MCP (e-mail, agenda, Slack, etc.) zodat de agent kan handelen`,
            coworkers: `Stel een persistente AI-coworker in die context over sessies heen onthoudt`,
            tokens:    `Controleer je contextbudget — vat lange invoer samen voor verzending naar het model`,
            claudemd:  `Maak CLAUDE.md met je projectregels zodat Claude Code altijd je conventies volgt`,
            copilotmd: `Maak .github/copilot-instructions.md zodat Copilot je codestijl volgt`,
          },
        };
        const action = (actions[lang] || actions.en)[id] || `Set up ${d?.label}`;
        const tryPrompt = lang === "nl"
          ? `Mijn idee: "${idea.trim()}". Leg me uit hoe ik ${d?.label} gebruik voor dit idee. Geef een concreet voorbeeld en de eerste stap om te beginnen.`
          : `My idea: "${idea.trim()}". Explain how I use ${d?.label} for this. Give a concrete example and the first step to get started.`;
        return { step: i+1, id, action, tryPrompt };
      });

    setSetup({ needed, skip, plan: planSteps, idea: idea.trim() });
  };

  const [activeEx, setActiveEx] = useState("newsletter");

  const ALL_EXAMPLES = [
    { id:"newsletter",   data:null },
    { id:"codereviewer", data:EXAMPLE_CODE_REVIEWER },
    { id:"bugfixer",     data:EXAMPLE_BUG_FIXER },
    { id:"commitwriter", data:EXAMPLE_COMMIT_WRITER },
  ];

  const currentEx = ALL_EXAMPLES.find(e => e.id === activeEx);
  const exData = activeEx === "newsletter" ? null : currentEx?.data;
  const exLang = exData ? (exData[lang] || exData.en) : null;

  return (
    <div>
      <div className="sh">
        <h2>{activeEx === "newsletter"
          ? t.exTitle
          : (t.examples?.find(e => e.id === activeEx)?.label || activeEx)}
        </h2>
        <p>{activeEx === "newsletter"
          ? t.exSubtitle
          : (lang === "en" ? "A software development example showing which concepts you need — and which you can skip." : "Een softwareontwikkelingsvoorbeeld dat toont welke concepten je nodig hebt — en welke je kunt overslaan.")}
        </p>
      </div>
      <div className="ex-wrap">

        {/* ── Example switcher ── */}
        <div className="ex-tabs">
          {(t.examples || []).map(ex => (
            <button key={ex.id} className={`ex-tab ${activeEx === ex.id ? "on" : ""}`}
              onClick={() => setActiveEx(ex.id)}>
              <span className="ex-tab-icon">{ex.icon}</span>
              {ex.label}
            </button>
          ))}
        </div>

        {/* ── Newsletter example (original) ── */}
        {activeEx === "newsletter" && (
          <>
            <div className="ex-scenario">
              <h4>{t.exScenario}</h4>
              <p>{t.exScenarioText}</p>
            </div>

            <p className="ex-section-title">{t.exHowItFits}</p>
            <div className="ex-cards">
              {EXAMPLE_CONCEPTS.map(ec => {
                const d = ec[lang] || ec.en;
                return (
                  <div key={ec.id} className="ex-card" style={{ "--c": ec.color }}>
                    <div className="ex-card-top">
                      <span className="ex-badge" style={{ color: ec.color, borderColor: ec.color }}>{ec.icon}</span>
                      <span className="ex-card-label">{getLabel(ec)}</span>
                    </div>
                    <div className="ex-role">{d.role}</div>
                    <div className="ex-contrib">{d.contribution}</div>
                    <button className="btn btn-sm btn-a" style={{ "--c": ec.color }} onClick={() => setPromptModal({ ec, d })}>
                      {t.exSeePrompt}
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="flow-section">
              <p className="ex-section-title">{t.exFlow}</p>
              <div className="flow-steps">
                {FLOW_STEPS.map((step, i) => {
                  const label = step[lang] || step.en;
                  return (
                    <div key={i} className="flow-step">
                      <div className="flow-num" style={{ color: step.color, borderColor: step.color }}>{i + 1}</div>
                      <span className="flow-label">{label}</span>
                      <span className="flow-badge" style={{ color: step.color, borderColor: step.color }}>{step.icon}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="outcome-section">
              <h3>{t.exOutcome}</h3>
              {t.exOutcomeItems.map((item, i) => (
                <div key={i} className="outcome-item">
                  <span className="outcome-check">+</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <button className="btn btn-p" onClick={() => onTry("agents")}>{t.exTryIt}</button>
          </>
        )}

        {/* ── Code dev examples (codereviewer / bugfixer) ── */}
        {exData && exLang && (
          <>
            {/* Scenario */}
            <div className="ex-scenario">
              <h4>{t.exScenario}</h4>
              <p>{exLang.scenario}</p>
            </div>

            {/* Concepts used chips */}
            <div style={{ marginBottom: 18 }}>
              <div className="build-section-label" style={{ marginBottom: 8 }}>
                {lang === "en" ? "Concepts used in this example" : "Concepten gebruikt in dit voorbeeld"}
              </div>
              <div className="ex-concepts-used">
                {exData.conceptsUsed.map(id => {
                  const c = CONCEPTS.find(x => x.id === id);
                  if (!c) return null;
                  const d = c[lang] || c.en;
                  return (
                    <span key={id} className="ex-concept-pill"
                      style={{ color: c.color, borderColor: c.color, background: `color-mix(in srgb,${c.color} 8%,transparent)` }}>
                      {d.label}
                    </span>
                  );
                })}
              </div>
              <div style={{ fontSize: ".65rem", color: "var(--t3)", marginTop: 6 }}>
                {lang === "en"
                  ? "Concepts not listed above are not needed for this setup."
                  : "Concepten die hierboven niet staan zijn niet nodig voor deze setup."}
              </div>
            </div>

            {/* How each concept contributes */}
            <p className="ex-section-title">{t.exHowItFits}</p>
            <div className="ex-cards">
              {exLang.howItFits.map((item) => {
                const c = CONCEPTS.find(x => x.id === item.id);
                if (!c) return null;
                return (
                  <div key={item.id} className="ex-card" style={{ "--c": c.color }}>
                    <div className="ex-card-top">
                      <span className="ex-badge" style={{ color: c.color, borderColor: c.color }}>{c.icon}</span>
                      <span className="ex-card-label">{(c[lang]||c.en).label}</span>
                    </div>
                    <div className="ex-role">{item.role}</div>
                    <div className="ex-contrib">{item.contribution}</div>
                  </div>
                );
              })}
            </div>

            {/* Flow */}
            <div className="flow-section">
              <p className="ex-section-title">{t.exFlow}</p>
              <div className="flow-steps">
                {exLang.flow.map((step, i) => (
                  <div key={i} className="flow-step">
                    <div className="flow-num" style={{ color: step.color, borderColor: step.color }}>{i + 1}</div>
                    <span className="flow-label">{step.en}</span>
                    <span className="flow-badge" style={{ color: step.color, borderColor: step.color }}>{step.icon}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Outcomes */}
            <div className="outcome-section">
              <h3>{t.exOutcome}</h3>
              {exLang.outcomes.map((item, i) => (
                <div key={i} className="outcome-item">
                  <span className="outcome-check">+</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <button className="btn btn-p" onClick={() => onTryWithMsg(exLang.tryConceptId, exLang.tryPrompt)}>
              {lang === "en" ? "Try this in the playground →" : "Probeer dit in de speeltuin →"}
            </button>
          </>
        )}

        {/* ── Build Your Setup ── */}
        <div className="build-box" style={{ marginTop: 28 }}>
          <h3>{t.buildTitle}</h3>
          <p>{t.buildSubtitle}</p>
          <textarea className="build-input" value={idea}
            onChange={e => { setIdea(e.target.value); setSetup(null); }}
            placeholder={t.buildPlaceholder}
            onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); analyseIdea(); } }}
          />
          <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
            <button className="btn btn-p" onClick={analyseIdea} disabled={!idea.trim()}>
              {t.buildBtn}
            </button>
            {setup && (
              <button className="btn" onClick={() => { setIdea(""); setSetup(null); }}>{t.buildReset}</button>
            )}
          </div>

          {setup && (
            <div className="build-result">

              {/* Needed concepts */}
              <div>
                <div className="build-section-label">{t.buildConceptsNeeded}</div>
                <div className="build-concept-chips">
                  {setup.needed.map(id => {
                    const c = CONCEPTS.find(x => x.id === id);
                    if (!c) return null;
                    const d = c[lang] || c.en;
                    return (
                      <span key={id} className="build-chip"
                        style={{ color: c.color, borderColor: c.color, background: `color-mix(in srgb,${c.color} 8%,transparent)` }}>
                        {d.label}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Skip */}
              {setup.skip.length > 0 && (
                <div>
                  <div className="build-section-label">{t.buildConceptsSkip}</div>
                  <div className="build-concept-chips">
                    {setup.skip.map(id => {
                      const c = CONCEPTS.find(x => x.id === id);
                      if (!c) return null;
                      const d = c[lang] || c.en;
                      return (
                        <span key={id} className="build-chip build-chip-skip"
                          style={{ color: "var(--t3)", borderColor: "var(--t3)" }}>
                          {d.label}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step-by-step plan with Try It button per step */}
              <div>
                <div className="build-section-label">{t.buildSetupPlan}</div>
                <div className="build-plan">
                  {setup.plan.map((step) => {
                    const c = CONCEPTS.find(x => x.id === step.id);
                    return (
                      <div key={step.step} className="build-plan-step" style={{ flexDirection: "column", gap: 6 }}>
                        <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                          <span className="build-plan-num" style={{ color: c ? c.color : "var(--t3)" }}>
                            {step.step}.
                          </span>
                          <div style={{ flex: 1 }}>
                            {c && <span style={{ color: c.color, fontWeight: 700, marginRight: 6, fontSize: ".63rem" }}>[{(c[lang]||c.en).label}]</span>}
                            <span>{step.action}</span>
                          </div>
                        </div>
                        <div style={{ paddingLeft: 22 }}>
                          <button className="btn btn-sm btn-a" style={{ "--c": c ? c.color : "var(--t1)" }}
                            onClick={() => onTryWithMsg(step.id, step.tryPrompt)}>
                            {lang === "en" ? "Try this step →" : "Probeer deze stap →"}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          )}
        </div>
      </div>

      {promptModal && (
        <div className="prompt-overlay" onClick={e => { if (e.target === e.currentTarget) setPromptModal(null); }}>
          <div className="prompt-panel">
            <button className="xbtn" onClick={() => setPromptModal(null)}>{t.close}</button>
            <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 5 }}>
              <span style={{ color: promptModal.ec.color, fontWeight: 700, fontSize: ".58rem", padding: "2px 5px", border: `1px solid ${promptModal.ec.color}`, borderRadius: 3, fontFamily: "var(--fm)" }}>
                {promptModal.ec.icon}
              </span>
              <h3 style={{ fontFamily: "var(--fd)", fontSize: "1rem", fontWeight: 700 }}>
                {getLabel(promptModal.ec)} — {lang === "en" ? "Example Prompt" : "Voorbeeldprompt"}
              </h3>
            </div>
            <p style={{ fontSize: ".63rem", color: "var(--t3)", marginBottom: 4 }}>{t.exHowPrompted}</p>
            <div className="prompt-pre">{promptModal.d.prompt}</div>
            <div style={{ display: "flex", gap: 7 }}>
              <button className="btn btn-p btn-sm" onClick={() => navigator.clipboard.writeText(promptModal.d.prompt)}>
                {t.exCopyPrompt}
              </button>
              <button className="btn btn-sm" onClick={() => setPromptModal(null)}>{t.close}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
