<details >

- Manage your context window
- Every prompt does not work for every model. Experiment around with different prompt for different model. Save prompt not the code 
  - Good video explaining same : https://www.youtube.com/watch?v=8rABwKRsec4
- 

 <summary style="font-size: x-large; font-weight: bold">Context Engineering </summary>


<details >
 <summary style="font-size: large; font-weight: bold">Overview </summary>

- **_Knowing limitation of anything is the most important thing to get most out it_**
- **_Understanding AI is much easier if you start understanding how human works_**

### Keep your `Conetxt Window` as lean as possible to get best result

- It is good to add more context at the start of conversation than in the middle because of `primacy bias` & `recency bias`
![img_14.png](img_14.png)

![img_101.png](img_101.png)
![img_103.png](img_103.png)
![img_15.png](img_15.png)
![img_16.png](img_16.png)
![img_17.png](img_17.png)
![img_18.png](img_18.png)
![img_100.png](img_100.png)
![img_102.png](img_102.png)

![img_104.png](img_104.png)
![img_19.png](img_19.png)

---

![img_20.png](img_20.png)

---

![img_21.png](img_21.png)

---

![img_22.png](img_22.png)

---

![img_23.png](img_23.png)

---

![img_24.png](img_24.png)

---

![img_25.png](img_25.png)

---

![img_26.png](img_26.png)

---

![img_27.png](img_27.png)

---

![img_28.png](img_28.png)

---

![img_29.png](img_29.png)

---

![img_30.png](img_30.png)

---

![img_31.png](img_31.png)

---

![img_32.png](img_32.png)

---

![img_34.png](img_34.png)

---

![img_35.png](img_35.png)

---

![img_36.png](img_36.png)

---

![img_37.png](img_37.png)

---

![img_38.png](img_38.png)

---

![img_39.png](img_39.png)

---

![img_40.png](img_40.png)

---

![img_41.png](img_41.png)

---

![img_42.png](img_42.png)

---

![img_43.png](img_43.png)

- Consider AI Agent to be `Super Talented Junior Engineer` you just need to have `**Mental Alignment**` 
- Rather than reading his code line by line which is not practical

---

![img_44.png](img_44.png)

---

![img_45.png](img_45.png)

---

![img_46.png](img_46.png)

---

![img_47.png](img_47.png)

---

![img_48.png](img_48.png)

---

![img_49.png](img_49.png)





Referred Video: 
- Matt Pocock: https://youtu.be/-uW5-TaVXu4?si=eokaEbTwtFh9xsi0
- YC Humanlayer Talk: https://www.youtube.com/watch?v=IS_y40zY-hc

-----
</details>


<details >
 <summary style="font-size: large; font-weight: bold">HumanLayer Conext Engineering</summary>

- Write as much as failing test to write better code with AI agent. Follow TDD approach
- Read each and everything from your `research` and `plan` steps
- Create the system on how to use AI tools with consistent spec Markdown file
- Be very consistent with your words across your specification. The Same word should mean the same thing across your specification

### Spec -> Research -> Planning -> Implementation

![img.png](img.png)
![img_13.png](img_13.png)




# 🦄 ai that works: Advanced Context Engineering for Coding Agents

> By popular demand, AI That Works #17 will dive deep on a new kind of context engineering: managing research, specs, and planning to get the most of coding agents and coding CLIs. You've heard people bragging about spending thousands/mo on Claude Code, maxing out Amp limits, and much more. Now Dex and Vaibhav are gonna share some tips and tricks for pushing AI coding tools to their absolute limits, while still shipping well-tested, bug-free code. This isn't vibe-coding, this is something completely different.

[Video](https://www.youtube.com/watch?v=42AzKZRNhsk) (1h27m)

[![Advanced Context Engineering for Coding Agents](https://img.youtube.com/vi/42AzKZRNhsk/0.jpg)](https://www.youtube.com/watch?v=42AzKZRNhsk)

## Links

- [The issue we resolved](https://github.com/BoundaryML/baml/issues/1252)
- [Some commands we use at humanlayer](https://github.com/humanlayer/humanlayer/tree/main/.claude/commands)
- [Agents as Spec Compilers](https://x.com/dexhorthy/status/1946586571865800724)
- [How not to use SubAgents](https://x.com/dexhorthy/status/1950288431122436597)
- [CodeLayer early access](https://hlyr.dev/code)
- [The new code - Sean's Talk from AI Engineer](https://www.youtube.com/watch?v=8rABwKRsec4) (the only talk from AIE 2025 with more views than 12-Factor agents :) )
- [Wielding agents - Beyang's talk from AI Engineer](https://www.youtube.com/watch?v=F_RyElT_gJk&t=480s)

## Episode Summary

This week's 🦄 ai that works session was on "Advanced Context Engineering for Coding Agents"!

We covered a ton on how to get the most out of coding agents. Here are key takeaways you can apply today:

- **Use sub-agents for complex tasks:** Instead of one monolithic prompt, decompose the problem. Use specialized prompts for sub-tasks like planning, identifying relevant files, and then generating the code.

- **Use intentional compaction:** Actively manage and shrink your context to keep the agent focused on what's most important.

- **Align language and naming:** Use consistent naming conventions across your codebase to make it easier for the AI to understand the relationships between different parts.

- **Review markdown docs to catch problems BEFORE implementation:** Review the research and plan the agent creates to foster mental alignment and ensure it's on the right track.

- **Practice exploratory coding:** Work alongside your agent to build your own intuition and spot where the AI excels and where it needs guidance.

- **CLAUDE.md > prompts > research > plans > implementation:** Focus human effort on the highest-leverage parts of the pipeline.

- **Phase 1 - Research:** Understanding the problem and how the system works today, including filenames.

- **Phase 2 - Planning:** Building a step-by-step outline of the changes to make.

- **Phase 3 - Implementation:** Executing the plan, testing as you go, ready for surprises along the way.

## The One Thing to Remember

> Context engineering isn't just about cramming more stuff into the prompt; it's a deliberate practice of structuring, compacting, and aligning information to make your AI agent a more effective partner.


## Whiteboards

<img width="400" alt="the-dumb-way" src="https://github.com/user-attachments/assets/a8e98a3f-0247-4de6-a0c7-4e6952a56e86" />

<img width="5936" alt="slightly-smarter" src="https://github.com/user-attachments/assets/5ee4eae7-2a1c-4554-b3a0-f7bc077ceaca" />

<img width="5108" alt="sub-agents" src="https://github.com/user-attachments/assets/d8d080ba-1899-46b3-b77b-a7ba73c96161" />

<img width="9552" alt="impact : process" src="https://github.com/user-attachments/assets/35db0eb0-d09f-4cd5-826b-e543af00f829" />

<img width="11064" alt="3-step-process" src="https://github.com/user-attachments/assets/64588a1f-b2ec-4820-a6dd-7fa754f29b8d" />

<img width="8598" alt="flow-1" src="https://github.com/user-attachments/assets/53bb8d91-700c-48ad-81bf-b0449074ab98" />


## Resources

- [Session Recording](https://www.youtube.com/watch?v=42AzKZRNhsk)
- [Discord Community](https://www.boundaryml.com/discord)
- Sign up for the next session on [Luma](https://lu.ma/qvp6ap99)


-----
</details>

-----
</details>



<details >
 <summary style="font-size: x-large; font-weight: bold">MCP</summary>

![img_2.png](img_2.png)
![img_3.png](img_3.png)
![img_1.png](img_1.png)
![img_4.png](img_4.png)
![img_5.png](img_5.png)
![img_6.png](img_6.png)
![img_7.png](img_7.png)
![img_8.png](img_8.png)
![img_9.png](img_9.png)
![img_10.png](img_10.png)

![img_11.png](img_11.png)
SDK are available in Python and Typescript
![img_12.png](img_12.png)
- Referred Video: https://x.com/bytebytego/status/1907838355657863385
- Fireship: https://www.youtube.com/watch?v=HyzlYwjoXOQ

Good MCP Repo:-
1. https://github.com/strowk/mcp-k8s-go
2. https://github.com/punkpeye/awesome-mcp-servers


------
</details>
