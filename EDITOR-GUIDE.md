# Editor guide: running the town website

This is for the people who keep the site up to date. You do not need to know
anything about code, databases, or how the site was built. If you can use
email and fill in a form, you can do everything here.

Everything happens in one place: the admin, at **your-site-address/admin**.
You sign in, make a change, and the public page updates on its own a moment
later. You cannot break the website by editing content. Take your time.

No jargon, in the order you are most likely to need it.

---

## Signing in

1. Go to **/admin** on the town's website address.
2. Enter your email and password.
3. The first time, change your password: click your name, then account
   settings. Pick something only you know.

If you ever forget your password, see **Resetting a password** at the end.

## The big idea

Down the left side you will see groups of content:

- **News** — announcements and notices.
- **Meetings** — individual dated meetings, with their agendas and minutes.
- **Boards & committees** — the standing boards and when they usually meet.
- **Documents** — every PDF the town publishes (ordinances, reports, forms).
- **Media** — photographs and images.

You add or change things here, click **Save**, and the matching public page
updates. If something does not look like it changed, give it a minute and
refresh the page.

## Posting a meeting (with its agenda)

This is the most common weekly job.

1. Click **Meetings**, then **Create New**.
2. Choose the **Board** (Select Board, Planning Board, and so on).
3. Set the **Date and start time**. The site treats anything from this moment
   on as upcoming, and the time is shown in the town's timezone automatically.
4. To attach the agenda PDF, use the **Agenda** field and click **Create New**
   right there — you can upload the PDF without leaving the page. (This also
   files it in Documents for you.) Add **Minutes** the same way later, once
   they are approved.
5. Leave a **Note** if there is anything specific: a public hearing item, a
   location change, a reason it moved.
6. **Save.**

You do not type a title; the site builds one from the board and date so it can
never disagree with itself.

## Adding a document

1. Click **Documents**, then **Create New**.
2. **Title**: write it the way a resident would look for it — "Shoreland Zone
   Ordinance", not "shoreland_zone_ord_final_v3".
3. **Category**: pick the heading it belongs under.
4. **Date adopted** (optional): the date it was approved or issued.
5. **Upload** the file.
6. **Text quality** — please do this check, it matters:
   - Open your PDF and try to **select a sentence with your cursor**.
   - If text highlights, choose **Selectable text — accessible**.
   - If nothing highlights, it is a **scan** (a picture of a document). A
     screen reader, and anyone who cannot see it, gets nothing from a scan.
     Choose **Scanned image — needs OCR**, and if you can, run it through an
     OCR / "make searchable" step before posting. If you are not sure, leave
     it on **Not checked yet** rather than guessing.
7. **Save.** The document appears under its category on the Documents page.

## Writing a news notice

1. Click **News**, then **Create New**.
2. Give it a **title**, a **published date**, and a short **summary** (this is
   what shows in the list).
3. Write the **body** if there is more to say.
4. **Save.** New notices appear on the News page and on the home page.

## Cancelling a meeting

Do not delete it. A meeting that just disappears looks like a mistake, and
people who already saw it need to be told.

1. Open the meeting under **Meetings**.
2. Change **Status** to **Cancelled** (or **Rescheduled** if it moved).
3. Add a **Note** with the reason or the new date.
4. **Save.** It stays on the page, clearly marked.

## Keeping boards up to date

Under **Boards & committees** you can set when each board normally meets, where,
and how to get an item on its agenda. If a board has no fixed schedule, leave
the schedule empty and the page honestly says so rather than inventing one.

## Resetting a password

1. On the **/admin** sign-in page, click **Forgot password**.
2. Enter your email. A reset link is sent to you.
3. Follow the link and set a new password.

If no email arrives, the site's email may not be set up yet — ask whoever
installed the site to check the email settings (SMTP) in SETUP.md.

---

## A few reassurances

- **You cannot break the public site by editing.** The worst case is a page
  that needs a correction, which you just edit again.
- **Changes are not instant to the second.** Give a published change a minute
  and a refresh before worrying.
- **When in doubt, say less.** An empty field shows an honest "not published
  yet", which is always better than a guess.
